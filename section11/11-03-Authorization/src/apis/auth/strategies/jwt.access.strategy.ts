import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

//import {KakaoStrategy} from 'passport-kakao'
//import {NaverStrategy} from 'passport-naver'
//import {GoogleStrategy} from 'passport-google'
export class JwtAccessStartegy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      // jwtFromRequest: (req) => {
      //   const temp = req.header.Authorization;
      //   const accessToken = temp.toLowerCase().replace('bearer', '');
      //   return accessToken;
      // },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //위에 로직과 동일 하다 .
      secretOrKey: '나의 비밀번호 ',
    });
  }

  validate(payload) {
    console.log(payload); // {sub: fhdslf s(유저Id)}

    return {
      id: payload.sub,
    };
  } //성고하면 이쪽으로 내려온다.
}
