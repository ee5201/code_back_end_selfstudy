import { InputType, PartialType } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { CreateBoardInput } from 'src/apis/boards/dto/create-board.input';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {}
