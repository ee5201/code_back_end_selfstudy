import { Field, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductSaleslocationInput } from 'src/apis/productsSaleslocations/dto/prdoductsSaleslocationInput';
import { ProductSaleslocation } from 'src/apis/productsSaleslocations/entities/productsSaleslocation.entity';

@InputType()
export class CreateProdutInput {
  @Field(() => String)
  name: string;
  @Field(() => String)
  description: string;
  @Min(0)
  @Field(() => Int)
  price: number;

  @Field(() => ProductSaleslocationInput)
  productSaleslocation: ProductSaleslocationInput;
}
