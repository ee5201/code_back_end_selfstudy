import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductServices } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products])],
  providers: [
    ProductsResolver, //
    ProductServices,
  ],
})
export class ProductsModule {}
