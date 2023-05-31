import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

//import {KakaoStrategy} from 'passport-kakao'
//import {NaverStrategy} from 'passport-naver'
//import {GoogleStrategy} from 'passport-google'
export class JwtRefreshStartegy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        console.log(req);
        const cookie = req.headers.cookie;
        const refreshtoken = cookie.replace('refreshToken=', '');
        return refreshtoken;
      },
      secretOrKey: 'refreshToken',
    });
  }

  validate(payload) {
    console.log(payload); // {sub: fhdslf s(유저Id)}

    return {
      id: payload.sub,
    };
  } //성고하면 이쪽으로 내려온다.
}
