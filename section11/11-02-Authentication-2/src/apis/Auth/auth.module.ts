import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserMoudle } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({}), //
    UserMoudle,
  ],
  providers: [
    AuthResolver,
    AuthService, //
  ],
})
export class AuthModule {}
