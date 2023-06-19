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
      { secret: 'mypassword', expiresIn: '1h' },
    );
  }

  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
    console.log(user);
    return this.getAccessToken({ user });
  }

  setRefreshToken({ user, context }: any) {
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
  setGoogleRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: '리프레시', expiresIn: '2w' },
    );

    // 개발환경
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; path=/`); // path 설정이 없으면, 소셜로그인에서 인식 못할 수 있음
  }

  async loginOAuth({ req, res }) {
    let user = await this.userService.findOnByEmail({ email: req.user.email });
    console.log('이것은 user', req.user.email);
    if (!user) user = await this.userService.create({ ...req.user });
    this.setGoogleRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5501/class/section11/11-06-google/frontend/social-login.html',
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
