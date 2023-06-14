import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  IProductServiceCheckSOldout,
  IProductServiceFindOne,
  IProductServicecreate,
} from './interface/productServicecreate';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IproductServiceUpdate } from './interface/productServicecreate';

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

  checkSoldOut({ product }: IProductServiceCheckSOldout): void {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상태 입니다.');
    }
  }

  create({ createProductInput }: IProductServicecreate): Promise<Product> {
    const result = this.ProductRepository.save({
      // name:
      ...createProductInput,
    });
    return result;
  }

  async update({
    productId,
    updateProductInput,
  }: IproductServiceUpdate): Promise<Product> {
    const product = await this.findOne({ productId });
    this.checkSoldOut({ product });

    const result = this.ProductRepository.save({
      ...product,
      ...updateProductInput,
    });
    return result;
  }
}
