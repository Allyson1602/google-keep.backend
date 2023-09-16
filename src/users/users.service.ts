import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(): Promise<User> {
    const user: User = new User();

    return await this.userRepository.save(user);
  }

  async findOne(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id } });
  }
}
