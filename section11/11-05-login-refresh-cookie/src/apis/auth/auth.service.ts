import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceRestoreAccessToken,
  IAuthServiceSetRefreshToken,
} from './interface/auth-service';
import { UsersService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Context } from '@nestjs/graphql';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService, //
  ) {}
  async login({
    email,
    password,
    context,
  }: IAuthServiceLogin): Promise<string> {
    //1. 이메일이 일치하는 유저를 DB에서 찾기
    const user = await this.userService.findOneByEmail({ email });
    //2. 일치하는 유저가 없으면 에러 던지기
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다. ');
    //3. 일치하느 유저가 있지만, 비밀번호가 틀렸다면?
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');

    //4. refreshToken(=JWT)을 만들어서 브라우저 쿠키에 저장해서 보내주기
    this.setRefreshToken({ user, context });

    //5. 일치하는 유저가 있고 , 비밀번호도 맞았다면?
    // => accessToken(=JWT)을 만들어서 브라우저에 전달하기

    //개발 환경

    return this.getAccessToken({ user });
  }

  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
    return this.getAccessToken({ user });
  }
  setRefreshToken({ context, user }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: 'refreshToken', expiresIn: '2w' },
    );
    context.res.setHeader('set-Cookie', `refreshToken=${refreshToken};`);

    //배포환경
    // context.res.setHeader(
    //   'set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None Secure; httpOnly`,
    // );
    // context.res.setHeader(
    //   'Acess-Control-Allow-Origin',
    //   'https://myfrontsite.com',
    // );
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: '나의비밀번호', expiresIn: '10s' },
    ); //토큰을 만든다.
  }
}
