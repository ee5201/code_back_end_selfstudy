import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { ProductTag } from './entities/productTags.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductsTagsServiceBulkInsert,
  IProductsTagsServiceFindByNames,
} from './interface/products-service.interface';

@Injectable()
export class ProductsTagsService {
  constructor(
    @InjectRepository(ProductTag)
    private readonly productsTagsRepository: Repository<ProductTag>,
  ) {}
  findByName({ tagNames }: IProductsTagsServiceFindByNames) {
    return this.productsTagsRepository.find({
      where: { name: In(tagNames) }, // tageNames에 있는 태그중에 같은 이름이 있는지 확인 하는 방법
    }); // [{id: "전자제품 ID", name:"전자제품"}]
  }
  bulkInsert({ names }: IProductsTagsServiceBulkInsert) {
    return this.productsTagsRepository.insert(names);
  }
}
