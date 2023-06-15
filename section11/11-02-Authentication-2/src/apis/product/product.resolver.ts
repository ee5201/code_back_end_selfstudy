import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Productservice } from './product.service';
import { CreateProdutInput } from './dto/createProductInput';
import { Product } from './entities/product.entity';
import { UpdateProductInput } from './dto/updateProductInput';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productservice: Productservice, //
  ) {}

  @Query(() => [Product])
  fetchProducts(): Promise<Product[]> {
    return this.productservice.findAll();
  }
  @Query(() => Product)
  fetchProduct(@Args('productId') productId: string): Promise<Product> {
    return this.productservice.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProdutInput,
  ): Promise<Product> {
    return this.productservice.create({ createProductInput });
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productservice.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId') productId: string, //
  ): Promise<boolean> {
    return this.productservice.delete({ productId });
  }
}
