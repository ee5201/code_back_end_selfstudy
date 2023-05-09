import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Int)
  price: number;
}
// price가 int로 타입을 주었지만 만일 -1000원을 입력했을 때 -도 int이기 때문에 입력값이 된다 이것을 제대로 검증하기 위해 class-validator와 class-transformer을 이용하게 된다.
