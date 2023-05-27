import { Module } from '@nestjs/common';
import { Mutation } from '@nestjs/graphql';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductSaleslocationsService } from '../productsaleslocation/productSaleslocation.service';
import { ProductSaleslocation } from '../productsaleslocation/entities/productsaleslocation.entity';
import { ProductTag } from '../productsTags/entities/productTag.entity';
import { ProductTagsService } from '../productsTags/productTags.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSaleslocation,
      ProductTag,
    ]),
  ],
  providers: [
    ProductResolver,
    ProductService, //
    ProductSaleslocationsService,
    ProductTagsService,
  ],
})
export class ProductsModule {}
