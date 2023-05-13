import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UsersMoudle } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({}), //
    UsersMoudle, //
  ],
  providers: [
    AuthResolver, //
    AuthService,
  ],
})
export class AuthModule {}
