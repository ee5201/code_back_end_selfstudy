import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TestInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  writer: string;

  @Field(() => String)
  content: string;
  @Field(() => String)
  title: string;
}
