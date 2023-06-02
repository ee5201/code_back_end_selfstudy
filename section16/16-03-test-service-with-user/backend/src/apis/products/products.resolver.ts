import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductServices } from './products.service';
import { CreateProductInput } from './dto/create-product.input';
import { Products } from './entities/product.entity';
import { UpdateProductInput } from './dto/update-product-Input';
import { DeleteProductInput } from './dto/delete-product-input';

@Resolver()
export class ProductsResolver {
  constructor(
    private readonly productServices: ProductServices, //
  ) {}
  //===========조회 ===========
  @Query(() => [Products])
  fetchProducts(): Promise<Products[]> {
    return this.productServices.findAll();
  }
  @Query(() => Products)
  fetchProduct(
    @Args('productId') productId: string, //
  ): Promise<Products> {
    return this.productServices.findOne({ productId });
  }

  @Mutation(() => Products)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Products> {
    // <<브라우저 결과 보내주는 2가지 방법

    //1. 등록된 내용이 담긴 객체를 그대로 돌려보내주기
    return this.productServices.create({ createProductInput });
    //2. 결과 메시지만 간단히 보내주기
  } // service에서 굳이 await 안해도 여기서 기다리기 때문에 안해도 된다.

  @Mutation(() => Products)
  updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<void> {
    return this.productServices.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId') productId: string,
    @Args('deleteProductInput') deleteProductInput: DeleteProductInput,
  ): Promise<boolean> {
    return this.productServices.delete({ productId, deleteProductInput });
  }
}
