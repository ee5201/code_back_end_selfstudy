import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersMoudle } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStartegy } from './strategies/jwt.access.strategy';
import { JwtRefreshStartegy } from './strategies/jwt.refresh.strategy';

@Module({
  imports: [
    JwtModule.register({}), //
    UsersMoudle, //
  ],
  providers: [
    JwtAccessStartegy,
    JwtRefreshStartegy,
    AuthResolver, //
    AuthService,
  ],
})
export class AuthModule {}
