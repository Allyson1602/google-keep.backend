import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    user.key = createUserDto.key;

    return await this.userRepository.save(user);
  }

  async findOne(key: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { key } });
  }
}
