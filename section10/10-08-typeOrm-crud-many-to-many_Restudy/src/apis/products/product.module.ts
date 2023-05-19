import { Module } from '@nestjs/common';
import { Mutation } from '@nestjs/graphql';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductSaleslocationsService } from '../productsaleslocation/productSaleslocation.service';
import { ProductSaleslocation } from '../productsaleslocation/entities/productsaleslocation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSaleslocation,
    ]),
  ],
  providers: [
    ProductResolver,
    ProductService, //
    ProductSaleslocationsService,
  ],
})
export class ProductsModule {}
