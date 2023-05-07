import { Module } from '@nestjs/common';
import { BoardsMoudle } from './apis/boards/boards.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './apis/boards/entities/board.entity';

@Module({
  imports: [
    BoardsMoudle,
    //ProductsModule,
    //UsersModule
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '1234567',
      database: 'myproject',
      entities: [Board],
      synchronize: true, // Board를 불러오기위해 동기화 하기위해 설정하는것
      logging: true, // debug역활
    }),
  ],
})
export class AppModule {}
