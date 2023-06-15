import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

import { UserMoudle } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './stratgies/jwt-access.strategy';
import { JwtRefreshStrategy } from './stratgies/jwt-refresh.strategy';

@Module({
  imports: [
    JwtModule.register({}), //
    UserMoudle,
  ],
  providers: [
    JwtAccessStrategy,
    JwtRefreshStrategy,
    AuthResolver,
    AuthService, //
  ],
})
export class AuthModule {}
