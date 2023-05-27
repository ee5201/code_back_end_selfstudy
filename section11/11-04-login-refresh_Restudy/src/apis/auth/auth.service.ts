import {
  ConflictException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  IAuthServiceLogin,
  IAuthServiceGetAccessToken,
} from './interface/authServiceinterface';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IAuthServiceRefreshToken } from 'src/commons/interfaces/context';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService, //
  ) {}
  async login({
    email,
    password,
    context,
  }: IAuthServiceLogin): Promise<string> {
    // 1. 이메일이 일치하는 유저를 db에서 찾기
    const user = await this.usersService.findOneByEmail({ email });

    //2. 일치하는 유저가 없으면? 에러 던지기!!
    if (!user)
      throw new UnprocessableEntityException('등록된 이메일이 없습니다. ');
    const isAuth = await bcrypt.compare(password, user.password);

    //3. 비밀번호가 틀리면 에러 던지기
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다. ');
    //4. refreshToken(=JWT)을 만들어서 브라우저 쿠키에 저장해서 보내주기
    this.setRefreshToken({ user, context });

    //5. 일치하면 토큰 보내기
    //=> accessToken(=JWT)
    return this.getAccessToken({ user });
  }

  setRefreshToken({ user, context }: IAuthServiceRefreshToken) {
    const refreshToken = this.jwtService.sign(
      {
        sub: user.id,
      },
      { secret: '나의리프레시비밀번호', expiresIn: '2w' },
    );

    //개발환경
    context.res.setHeader(
      'set-Cookie',
      `refreshToken= ${refreshToken}; path=/;`,
    );

    //배포환경
    // context.res.sertHeader(
    //   'set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.mybacksite.com; SameSite=None; Secure; httpOnly`,
    // );
    // context.res.setHeader(
    //   'Access-Control-Allow-Origin',
    //   ' http://myfrontsite.com',
    // );
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: '나의비밀번호', expiresIn: '1h' },
    );
  }
}

// ConflictException:

// ConflictException은 서버에서 요청이 충돌이 발생한 경우를 나타내는 예외입니다.
// 주로 데이터의 중복 생성이나 충돌이 발생하는 경우에 사용됩니다. 예를 들어, 중복된 사용자 이름으로 회원 가입을 시도하거나 이미 존재하는 리소스를 중복으로 생성하려고 할 때 발생시킬 수 있습니다.
// HTTP 상태 코드로는 409 Conflict를 응답으로 전달합니다.
// UnprocessableEntityException:

// UnprocessableEntityException은 요청이 유효하지 않은 경우를 나타내는 예외입니다.
// 주로 요청이나 데이터의 형식이 잘못된 경우에 사용됩니다. 예를 들어, 필수 필드가 누락된 경우, 형식이 맞지 않는 데이터를 전송한 경우 등이 있습니다.
// HTTP 상태 코드로는 422 Unprocessable Entity를 응답으로 전달합니다.
// 이러한 예외 클래스들은 주로 NestJS의 예외 처리기에서 사용되며, 클라이언트에게 적절한 에러 응답을 제공하기 위해 활용됩니다. 각각의 예외는 특정한 상황에 맞게 사용되므로, 자신의 애플리케이션에서 어떤 상황에 어떤 예외를 사용해야 하는지 판단하여 적절하게 활용하시면 됩니다.
