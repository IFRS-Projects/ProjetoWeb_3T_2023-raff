import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { deCrypt } from './../../../common/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email, pass) {
    const user = await this.usersService.findOne(email);
    console.log(await deCrypt(pass, user.password));

    if (!(await deCrypt(pass, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username: user.name,
      email: user.email,
      permissions: user.permissions,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
