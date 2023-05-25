import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { ProductTag } from './entities/productTag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import {
  IProductTagServiceBulk,
  IProductTagsServiceFindName,
} from './interface/ProductTagServiceinterface';

@Injectable()
export class ProductTagsService {
  constructor(
    @InjectRepository(ProductTag)
    private readonly productTagsRepository: Repository<ProductTag>,
  ) {}

  findByName({ tagNames }: IProductTagsServiceFindName) {
    return this.productTagsRepository.find({
      where: { name: In(tagNames) },
    });
  }

  bulkInsert({ names }: IProductTagServiceBulk) {
    return this.productTagsRepository.insert(names);
  }
}
