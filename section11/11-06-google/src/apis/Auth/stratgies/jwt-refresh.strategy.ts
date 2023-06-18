import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        console.log(req);
        const cookie = req.headers.cookie;
        console.log(cookie);
        const refreshToken = cookie.replace('refreshToken=', '');
        console.log(refreshToken);
        return refreshToken;
      },
      secretOrKey: '리프레시',
    });
  }
  validate(payload) {
    console.log(payload);
    return {
      id: payload.sub,
    };
  }
}
