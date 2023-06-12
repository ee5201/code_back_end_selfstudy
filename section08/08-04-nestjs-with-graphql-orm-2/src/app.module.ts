import { Module } from '@nestjs/common';
import { BoardModule } from './apis/board/boards.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './apis/board/entities/board.entity';

@Module({
  imports: [
    BoardModule, //
    //productsModule,
    //UsersModule
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/qqq.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '1234567',
      database: 'Restudy',
      entities: [Board],
      logging: true,
      synchronize: true,
    }),
  ],
})
export class AppModule {}
