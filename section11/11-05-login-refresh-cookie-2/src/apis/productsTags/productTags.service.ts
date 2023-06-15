import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProductTags } from './entities/productsTag.entity';
import {
  IProductTagsServiceFindBynames,
  IProductsTagsServiceBulkInsert,
} from './interfaces/product-tags-service.interface';

@Injectable()
export class ProductTagsService {
  constructor(
    @InjectRepository(ProductTags)
    private readonly productTagsRepository: Repository<ProductTags>,
  ) {}
  findByNames({ tagnames }: IProductTagsServiceFindBynames) {
    return this.productTagsRepository.find({
      where: { name: In(tagnames) },
    });
  }

  bulkInsert({ names }: IProductsTagsServiceBulkInsert) {
    return this.productTagsRepository.insert(names);
  }
}
