import { CreateProdutInput } from '../dto/createProductInput';

export interface IProductServicecreate {
  createProductInput: CreateProdutInput;
}

export interface IProductServiceFindOne {
  productId: string;
}
