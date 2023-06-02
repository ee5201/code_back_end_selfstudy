import { CreateProductInput } from '../dto/create-product.input';
import { DeleteProductInput } from '../dto/delete-product-input';
import { UpdateProductInput } from '../dto/update-product-Input';
import { Products } from '../entities/product.entity';

export interface IProductsServiceCreate {
  createProductInput: CreateProductInput;
}

export interface IProductsServiceFindOne {
  productId: string;
}

export interface IProductsServiceUpdate {
  productId: string;
  updateProductInput: UpdateProductInput;
}

export interface IProductsSerivceCheckSoldout {
  product: Products;
}

export interface IProductsSerivceDelete {
  productId: string;
  deleteProductInput: DeleteProductInput;
}
