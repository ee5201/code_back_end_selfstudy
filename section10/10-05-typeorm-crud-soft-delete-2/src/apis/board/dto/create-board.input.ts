import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBoardInput {
  @Field(() => String, { nullable: true })
  writer: string;
  @Field(() => String, { nullable: true })
  title: string;
  @Field(() => String, { nullable: true })
  contents: string;
}
