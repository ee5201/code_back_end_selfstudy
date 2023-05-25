import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStratgy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      // jwtFromRequest: (req) => {
      //   const temp = req.headers.Authorization; // Bearer jfdsaklfj klsdf
      //   const accessToken = temp.toLowercase().replace('bearer', '');
      //   return accessToken;
      // },  // 수동으로 작성할 때
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '나의비밀번호',
    });
  }

  validate(payload) {
    console.log(payload);
    return {
      id: payload.sub,
    };
  }
}
