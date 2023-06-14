import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { Productservice } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
    ]),
  ],
  providers: [
    ProductResolver, //
    Productservice,
  ],
})
export class ProductModule {}
