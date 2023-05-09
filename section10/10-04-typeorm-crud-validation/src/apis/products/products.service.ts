import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Products } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductsSerivceCheckSoldout,
  IProductsServiceCreate,
  IProductsServiceFindOne,
  IProductsServiceUpdate,
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
  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Products> {
    // 기존 있는 내용을 재사용하여,로직을 통일하자!!
    const product = await this.findOne({ productId });

    // 검증은 서비스
    this.checkSoldout({ product });

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품 입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
    //에러를 던진다 throw 밑에 있는건 실행 안한다. 에러 발생시
    //버그 HttpException:버그에러예외
    //========================================
    // try {
    //   const result = this.productsRepository.save({
    //     // id: productId,
    //     // isSoldout: product.isSoldout,
    //     // name: updateProductInput.name,
    //     // description: updateProductInput.description,
    //     // price: updateProductInput.price,
    //     ...product, // 수정후, 수정되지 않은 다른 결과값까지 모두 객체로 돌려받고 싶을 때
    //     ...updateProductInput,
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    //========================================
    const result = this.productsRepository.save({
      // id: productId,
      // isSoldout: product.isSoldout,
      // name: updateProductInput.name,
      // description: updateProductInput.description,
      // price: updateProductInput.price,
      ...product, // 수정후, 수정되지 않은 다른 결과값까지 모두 객체로 돌려받고 싶을 때
      ...updateProductInput,
    });

    return result;
  }

  checkSoldout({ product }: IProductsSerivceCheckSoldout) {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품 입니다. ');
    }
  }
}

// this.productsRepository.save
// save에 id가 존재하면 수정 없으면 등록이다 !!!
// this.productsRepository.create()
// DB 접속이랑 관련 없다.  등록을 위해서 빈 껍데기 객체 만들기 위함
// this.productsRepository.insert()
// 결과를 객체로 못 돌려 받는 등록 방법
// this.productsRepository.update()
// 결과를 객체로 못 돌려 받는 수정 방법

//에러는 서비스에서 검증 한다. 이유는

//exceptionfilter
