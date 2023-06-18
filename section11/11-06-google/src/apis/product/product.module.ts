import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { Productservice } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductSaleslocationService } from '../productsSaleslocations/productSaleslocation.service';
import { ProductSaleslocation } from '../productsSaleslocations/entities/productsSaleslocation.entity';
import { ProductTagsService } from '../productsTags/productTags.service';
import { ProductTags } from '../productsTags/entities/productsTag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSaleslocation,
      ProductTags,
    ]),
  ],
  providers: [
    ProductResolver, //
    Productservice,
    ProductSaleslocationService,
    ProductTagsService,
  ],
})
export class ProductModule {}
