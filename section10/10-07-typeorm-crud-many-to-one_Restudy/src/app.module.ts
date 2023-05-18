import { Module } from '@nestjs/common';
import { BoardsMoudle } from './apis/boards/boards.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './apis/boards/entities/board.entity';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './apis/products/product.module';
import { ProductsCategoriesModule } from './apis/productsCategories/productsCategories.module';

@Module({
  imports: [
    BoardsMoudle,
    ProductsModule,
    ProductsCategoriesModule,
    //UsersModule,
    ConfigModule.forRoot(), // TypeormModule위에 무조건 있어야 한다.
    // 그 이유는 읽지 못하기 때문이다. configModule은 env를 읽기 위해서 nest에서 사용하는거 원래는 Dotenv라이브러리 다운 받아서 사용한다.
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql', //mysql 이 맞아 너가 몰라서 그래 사용할 때 as mysql
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true, // Board를 불러오기위해 동기화 하기위해 설정하는것
      logging: true, // debug역활
    }),
  ],
})
export class AppModule {}
