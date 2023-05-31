import { Module } from '@nestjs/common';
import { BoardsMoudle } from './apis/boards/boards.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './apis/boards/entities/board.entity';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './apis/products/products.module';
import { ProductsCategoriesModule } from './apis/productsCategories/productsCategories.module';
import { UsersMoudle } from './apis/users/user.module';
import { AuthModule } from './apis/auth/auth.module';
import { PointsTransactionsModule } from './apis/pointsTransactions/pointsTransactions.module';
import { PaymentsMoudle } from './apis/payments/payments.module';
import { FilesModule } from './apis/files/files.module';

@Module({
  imports: [
    BoardsMoudle,
    FilesModule,
    PointsTransactionsModule,
    PaymentsMoudle,
    ProductsModule,
    ProductsCategoriesModule,
    UsersMoudle,
    AuthModule,
    ConfigModule.forRoot(), // TypeormModule위에 무조건 있어야 한다.
    // 그 이유는 읽지 못하기 때문이다. configModule은 env를 읽기 위해서 nest에서 사용하는거 원래는 Dotenv라이브러리 다운 받아서 사용한다.
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({
        req,
        res,
      }), //req는 기본적으로 들어오지만 이걸 작성해야지만 들어온다 .
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql', //mysql 이 맞아 너가 몰라서 그래 사용할 때 as mysql
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'], //__dirname:현위치  **모든 폴더안에 *.entity들어가있는 파일들만 모두 등록
      synchronize: true, // Board를 불러오기위해 동기화 하기위해 설정하는것
      logging: true, // debug역활
    }),
  ],
})
export class AppModule {}
