import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repositories } from '../constants';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(Repositories.userRepository)
    private userRepository: Repository<User>,
  ) {}

  async findOne(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(email: string, password: string) {
    return this.userRepository.create({ email, password });
  }
}
