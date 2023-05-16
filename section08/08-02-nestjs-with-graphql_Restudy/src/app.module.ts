import { Module } from '@nestjs/common';
import { BoardsMoudle } from './apis/boards/boards.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    BoardsMoudle,
    //ProductsModule,
    //UsersModule
    GraphQLModule.forRoot<ApolloDriverConfig>({ // graphql 세팅 완료
      driver: ApolloDriver, 
      autoSchemaFile: 'src/commons/graphql/schema.gql', //schema 자동으로 생성하는법 
    }),
  ],
})
export class AppModule {}
