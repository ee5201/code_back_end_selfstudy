import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  // 상속받음
}

// PickType(CreateProductInput, ['name','price'])
// OmitType(CreateProductInput, ['name'])
//PartialType(CreateProductInput)
