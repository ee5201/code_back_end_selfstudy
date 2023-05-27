import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { ProductSaleslocation } from './entities/productsaleslocation.entity';

@Injectable()
export class ProductSaleslocationsService {
  constructor(
    @InjectRepository(ProductSaleslocation)
    private readonly ProductServiceRepositoryRepository: Repository<ProductSaleslocation>,
  ) {}
  create({ productSaleslocation }) {
    return this.ProductServiceRepositoryRepository.save({
      ...productSaleslocation,
    });
  }
}
