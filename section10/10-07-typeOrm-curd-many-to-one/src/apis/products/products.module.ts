import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductServices } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from './entities/product.entity';
import { ProductsSaleslocationsService } from '../productsSaleslocations/productsSaleslocations.service';
import { ProductSaleslocation } from '../productsSaleslocations/entities/productSaleslocations.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Products, ProductSaleslocation])],
  providers: [
    ProductsResolver, //
    ProductServices,
    ProductsSaleslocationsService,
  ],
})
export class ProductsModule {}
