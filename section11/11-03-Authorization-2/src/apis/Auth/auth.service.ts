import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
} from './interfaces/AuthServiceInput';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService, //
    private readonly jwtService: JwtService,
  ) {}

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: 'mypassword', expiresIn: '1h' },
    );
  }

  async login({ email, password }: IAuthServiceLogin): Promise<string> {
    const user = await this.userService.findOnByEmail({ email });

    if (!user)
      throw new UnprocessableEntityException('등록된 이메일이 없습니다.');
    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    return this.getAccessToken({ user });
  }
}
