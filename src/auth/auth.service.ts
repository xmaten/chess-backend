import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (await argon2.verify(user?.password, pass)) {
      throw new UnauthorizedException('Password or email incorrect');
    }

    const payload = { email: user.email, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user.email === email) {
      throw new UnprocessableEntityException('Email is already taken');
    }

    await this.usersService.create(email, pass);
  }
}
