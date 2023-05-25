import { InputType, OmitType } from '@nestjs/graphql';
import { ProductSaleslocation } from '../entities/productsaleslocation.entity';

@InputType()
export class ProductSaleslocationInput extends OmitType(
  ProductSaleslocation,
  ['id'],
  InputType,
) {}
