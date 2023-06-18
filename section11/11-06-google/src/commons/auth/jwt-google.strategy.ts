import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';

export class JwtGoogleStratey extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '569790408079-k4id9fj7mum1bkj4gqlhlcqlm86ol7dq.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'],
    });
  }
  validate(accessToken, refreshToken, profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

    return {
      email: profile.emails[0].value,
      name: profile.displayName,
      password: '1234',
      age: 10,
    };
  }
}
