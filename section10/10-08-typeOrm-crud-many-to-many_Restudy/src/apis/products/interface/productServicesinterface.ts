import { CreateProductInput } from '../dto/create-product.input';
import { UpdateProductInput } from '../dto/update-product.input';
import { Product } from '../entities/product.entity';

export interface IProductServiceCreate {
  createProductInput: CreateProductInput;
}

export interface IProductServiceUpdate {
  updateProductInput: UpdateProductInput;
  productId: string;
}

export interface IProductServiceChecksoldout {
  product: Product;
}

export interface IProductServiceDelete {
  productId: string;
}
