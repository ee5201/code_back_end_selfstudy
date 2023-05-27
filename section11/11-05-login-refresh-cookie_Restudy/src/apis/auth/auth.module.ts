import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserService } from '../users/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UserModule } from '../users/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStratgy } from './strategies/jwt-access.strategy';
import { JwtrefreshStratgy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [JwtModule.register({}), UserModule],
  providers: [
    JwtAccessStratgy,
    JwtrefreshStratgy,
    AuthResolver, //
    AuthService,
  ],
})
export class AuthModule {}
