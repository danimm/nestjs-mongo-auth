import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import * as bycrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  /**
   * Validate a user using email and password
   * @param email
   * @param password
   */
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const matchedPassword = await bycrypt.compare(password, user.password);
      if (matchedPassword) {
        const { password, ...rta } = user.toJSON();
        return rta;
      }
    }
    return null;
  }
}
