import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuards } from '../Auth/guards/gql-auth.guard';
import { IContext } from 'src/commons/interfaces/context';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthGuards)
  @Query(() => String)
  fetchUser(@Context() context: IContext): string {
    console.log('==================================');
    console.log(context.req.user);
    console.log('==================================');
    return '인간에 성공하였습니다.';
  }

  @Mutation(() => User)
  createUser(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Args('name') name: string,
    @Args({ name: 'age', type: () => Int }) age: number,
  ): Promise<User> {
    return this.userService.create({ email, password, name, age });
  }
}
