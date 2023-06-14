import { InputType, PartialType } from '@nestjs/graphql';
import { CreateProdutInput } from './createProductInput';
@InputType()
export class UpdateProductInput extends PartialType(CreateProdutInput) {}
