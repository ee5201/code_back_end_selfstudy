import { Injectable } from '@nestjs/common';
import {
  IProductServiceFindOne,
  IProductServicecreate,
} from './interface/productServicecreate';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class Productservice {
  constructor(
    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>,
  ) {}
  findAll(): Promise<Product[]> {
    return this.ProductRepository.find();
  }

  findOne({ productId }: IProductServiceFindOne): Promise<Product> {
    return this.ProductRepository.findOne({ where: { id: productId } });
  }

  create({ createProductInput }: IProductServicecreate): Promise<Product> {
    const result = this.ProductRepository.save({
      // name:
      ...createProductInput,
    });
    return result;
  }
}
