import { Injectable } from '@nestjs/common';
import { IProductServiceCreate } from './interface/productServicesinterface';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly ProductServiceRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.ProductServiceRepository.find();
  }

  findOne({ productId }): Promise<Product> {
    return this.ProductServiceRepository.findOne({ where: { id: productId } });
  }

  create({ createProductInput }: IProductServiceCreate): Promise<Product> {
    const result = this.ProductServiceRepository.save({
      ...createProductInput,
    });
    return result;
  }
}
