import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      key: '111',
    },
    {
      userId: 2,
      key: '222',
    },
  ];

  async findOne(key: string): Promise<User | undefined> {
    return this.users.find((user) => user.key === key);
  }
}
