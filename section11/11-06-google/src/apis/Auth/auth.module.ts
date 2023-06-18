import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

import { UserMoudle } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './stratgies/jwt-access.strategy';
import { JwtRefreshStrategy } from './stratgies/jwt-refresh.strategy';
import { AuthController } from './auth.controller';
import { JwtGoogleStratey } from 'src/commons/auth/jwt-google.strategy';

@Module({
  imports: [
    JwtModule.register({}), //
    UserMoudle,
  ],
  providers: [
    JwtAccessStrategy,
    JwtRefreshStrategy,
    JwtGoogleStratey,
    AuthResolver,
    AuthService, //
  ],
  controllers: [AuthController],
})
export class AuthModule {}
