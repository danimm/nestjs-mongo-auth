import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import * as bycrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@Inject(UsersService) private usersService: UsersService) {}

  /**
   * Validate a user using email and password
   * @param loginEmail
   * @param loginPassword
   */
  async validateUser(loginEmail: string, loginPassword: string) {
    const userFound = await this.usersService.findByEmail(loginEmail);
    if (userFound) {
      const { password, user } = userFound;
      const matchedPassword = await bycrypt.compare(loginPassword, password);
      if (matchedPassword) return user;
    }
    return null;
  }
}
