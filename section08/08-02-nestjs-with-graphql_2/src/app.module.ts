import { Module } from '@nestjs/common';
import { BoardModule } from './apis/board/boards.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    BoardModule, //
    //productsModule,
    //UsersModule
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/qqq.gql',
    }),
  ],
})
export class AppModule {}
