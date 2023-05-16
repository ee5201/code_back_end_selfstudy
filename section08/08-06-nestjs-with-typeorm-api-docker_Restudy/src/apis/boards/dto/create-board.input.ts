import { Field, InputType } from '@nestjs/graphql';

//Objecttype = type
//InputType = input
@InputType()
export class CreateBoardInput {
  @Field(() => String)
  writer: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  contents: string;
}
