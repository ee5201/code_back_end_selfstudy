import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'auth') {
  constructor() {
    super({
      // jwtFromRequest: (req) => {
      //   const temp = req.header.Authorization;
      //   const accessToken = temp.toLowercase().replace('bearer', ' ');
      //   return accessToken;
      // },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'mypassword',
    });
  }
  validate(payload) {
    console.log(payload);
    return {
      id: payload.sub,
    };
  }
}
