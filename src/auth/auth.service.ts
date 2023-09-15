import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(key: string): Promise<any> {
    const user = await this.usersService.findOne(key);

    const payload = { sub: user.id, key: user.key };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
