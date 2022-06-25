import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bycrypt from 'bcrypt';

import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/entities/user.entity';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

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

  generateJWT(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
