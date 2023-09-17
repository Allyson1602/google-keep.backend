import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(userId: number): Promise<Auth> {
    const user = await this.usersService.findOne(userId);

    const payload = { sub: user.id, key: user.id };
    return {
      id: user.id,
      key: await this.jwtService.signAsync(payload),
    };
  }
}
