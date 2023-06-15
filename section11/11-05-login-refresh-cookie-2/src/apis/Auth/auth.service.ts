import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { UserService } from '../users/user.service';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceRefreshToken,
  IAuthServiceRestoreAccessToken,
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
      { secret: 'mypassword', expiresIn: '10s' },
    );
  }

  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
    console.log(user);
    return this.getAccessToken({ user });
  }

  setRefreshToken({ user, context }: IAuthServiceRefreshToken) {
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: '리프레시', expiresIn: '2w' },
    );
    //개발환경
    context.res.setHeader(
      'set-Cookie',
      `refreshToken=${refreshToken}; path=/;`,
    );
  }

  async login({
    email,
    password,
    context,
  }: IAuthServiceLogin): Promise<string> {
    const user = await this.userService.findOnByEmail({ email });

    if (!user)
      throw new UnprocessableEntityException('등록된 이메일이 없습니다.');
    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');
    this.setRefreshToken({ user, context });

    return this.getAccessToken({ user });
  }
}
