import { Module } from '@nestjs/common';
import { BoardModule } from './apis/board/boards.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import 'dotenv/config';
import { ProductModule } from './apis/product/product.module';
import { ProductsCategoriesModule } from './apis/productsCategories/productsCategories.module';
import { UserMoudle } from './apis/users/user.module';
import { AuthModule } from './apis/Auth/auth.module';

@Module({
  imports: [
    AuthModule,
    BoardModule, //
    ProductModule,
    ProductsCategoriesModule,
    UserMoudle,
    //UsersModule
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/qqq.gql',
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      logging: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
