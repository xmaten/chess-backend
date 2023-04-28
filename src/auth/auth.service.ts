import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new NotFoundException('User doesnt exist');
    }

    const verifyPass = await argon2.verify(user?.password, pass);

    if (!verifyPass) {
      throw new UnauthorizedException('Password or email incorrect');
    }

    const payload = { email: user.email, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user?.email === email) {
      throw new UnprocessableEntityException('Email is already taken');
    }

    const hash = await argon2.hash(pass);

    const result = await this.usersService.create(email, hash);

    return result;
  }
}
