import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';

export class JwtrefreshStratgy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        console.log(req);
        const cookie = req.headers.cookie; // Bearer jfdsaklfj klsdf
        console.log(cookie);
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      }, // 수동으로 작성할 때

      secretOrKey: '나의리프레시비밀번호',
    });
  }

  validate(payload) {
    console.log(payload);
    return {
      id: payload.sub,
    };
  }
}
