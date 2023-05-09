import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Products } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductsServiceCreate,
  IProductsServiceFindOne,
} from './interface/products-service.interface';

@Injectable()
//기본 싱글톤
// api할때마다 new 해줘 scop: Scope.ReQuest
// 매번 만들어줘 scop: Scope.TRANSIENT
export class ProductServices {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>, //typeorm만들었다.
  ) {}
  findAll(): Promise<Products[]> {
    return this.productsRepository.find();
  }
  findOne({ productId }: IProductsServiceFindOne): Promise<Products> {
    return this.productsRepository.findOne({ where: { id: productId } });
  }
  create({ createProductInput }: IProductsServiceCreate): Promise<Products> {
    // product
    const result = this.productsRepository.save({
      //저장하고 받는게 Product데이터이기 때문에 타입을 product로 한다. promise를 사용하는 이유는 시간이 걸리는 작업이 포함되어 있기 때문이다.
      ...createProductInput,
      // 하나하나 직접 나열하는 방식
      // name: '마우스',
      // description: '좋은 마우스',
      // price: 3000,
    });

    // result 안에는 무엇이 있을까?
    // result = {
    //  id: 'sadk;lksdl;ad'
    // name: '미우스'
    // description: ''
    //price 3000
    //}
    return result;
  }
}
