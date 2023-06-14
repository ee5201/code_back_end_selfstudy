import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { Productservice } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductSaleslocationService } from '../productsSaleslocations/productSaleslocation.service';
import { ProductSaleslocation } from '../productsSaleslocations/entities/productsSaleslocation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSaleslocation,
    ]),
  ],
  providers: [
    ProductResolver, //
    Productservice,
    ProductSaleslocationService,
  ],
})
export class ProductModule {}
