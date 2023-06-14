import { CreateProdutInput } from '../dto/createProductInput';
import { UpdateProductInput } from '../dto/updateProductInput';
import { Product } from '../entities/product.entity';

export interface IProductServicecreate {
  createProductInput: CreateProdutInput;
}

export interface IProductServiceFindOne {
  productId: string;
}

export interface IproductServiceUpdate {
  productId: string;
  updateProductInput: UpdateProductInput;
}

export interface IProductServiceCheckSOldout {
  product: Product;
}
