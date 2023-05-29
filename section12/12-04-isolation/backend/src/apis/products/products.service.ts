import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Products } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IProductsSerivceCheckSoldout,
  IProductsSerivceDelete,
  IProductsServiceCreate,
  IProductsServiceFindOne,
  IProductsServiceUpdate,
} from './interface/products-service.interface';
import { ProductsSaleslocationsService } from '../productsSaleslocations/productsSaleslocations.service';
import { ProductsTagsService } from '../productsTags/productsTags.service';

@Injectable()
//기본 싱글톤
// api할때마다 new 해줘 scop: Scope.ReQuest
// 매번 만들어줘 scop: Scope.TRANSIENT
export class ProductServices {
  constructor(
    @InjectRepository(Products)
    private readonly productsRepository: Repository<Products>, //typeorm만들었다.

    private readonly productsSaleslocationsService: ProductsSaleslocationsService,

    private readonly productsTagsService: ProductsTagsService,
  ) {}
  findAll(): Promise<Products[]> {
    return this.productsRepository.find({
      relations: ['productSaleslocation', 'productCategory'],
    });
  }
  findOne({ productId }: IProductsServiceFindOne): Promise<Products> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory'],
    });
  }
  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Products> {
    // product
    // const result = this.productsRepository.save({
    //   // 상품 하나만 등록 할 때 사용하는 방법
    //   //저장하고 받는게 Product데이터이기 때문에 타입을 product로 한다. promise를 사용하는 이유는 시간이 걸리는 작업이 포함되어 있기 때문이다.
    //   // ...createProductInput,
    //   // 하나하나 직접 나열하는 방식
    //   // name: '마우스',
    //   // description: '좋은 마우스',
    //   // price: 3000,
    // });

    //2. 상품과 상품 거래위치를 같이 등록하는 방법
    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;

    // 2-1) 상품거래위치 등록
    const result = await this.productsSaleslocationsService.create({
      productSaleslocation,
    }); //서비스를 타고 가야하는 이유는 ...?
    // 레파지토리에 직접 접근 하면 검증 로직을 통일 시킬수 없다.

    // 2-2) 상품태그 등록
    // productTags가 ["#전자제품","#영등포","#컴퓨터"]와 같은 패턴이라고 가정
    const tagNames = productTags.map((el) => el.replace('#', ''));

    const prevTags = await this.productsTagsService.findByName({ tagNames }); // [{id: "전자제품 ID", name:"전자제품"}]

    const temp = []; //[{name:"영등포"}]
    tagNames.forEach((el) => {
      const isExists = prevTags.find((prevEl) => el === prevEl.name);
      if (!isExists) temp.push({ name: el }); // prevEl = 전자제품
    });

    const newTags = await this.productsTagsService.bulkInsert({ names: temp }); //bulk-insert는 save()로 불가능 하다.

    const tags = [...prevTags, ...newTags.identifiers]; //[{id:" 전자젲품ID"}, {id:"컴퓨터ID"},{id:"영등포ID"}]

    const result2 = this.productsRepository.save({
      ...product,
      productSaleslocation: result, // result 통째로 넣기 vs id만 빼서 넣기
      productCategory: {
        id: productCategoryId,
        //만약 name까지 받고 싶으면?
        // => createProductInput에 name까지 포함해서 받아오기
      },
      productTags: tags,
    });

    return result;
  }
  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<void> {
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
    //숙제-1) 왜 아래 에러가 발생하는지 고민해보기
    //숙제-2) 왜 아래 에러가 고쳐보기
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
    // const result = this.productsRepository.save({
    //   // id: productId,
    //   // isSoldout: product.isSoldout,
    //   // name: updateProductInput.name,
    //   // description: updateProductInput.description,
    //   // price: updateProductInput.price,
    //   ...product, // 수정후, 수정되지 않은 다른 결과값까지 모두 객체로 돌려받고 싶을 때
    //   ...updateProductInput,
    // });

    // return result;
  }

  checkSoldout({ product }: IProductsSerivceCheckSoldout) {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품 입니다. ');
    }
  }

  async delete({
    productId,
    deleteProductInput,
  }: IProductsSerivceDelete): Promise<boolean> {
    // 1. 실제 삭제
    // const result = await this.productsRepository.delete({ id: productId });
    // return result.affected ? true : false; // affetced 실제로 DB에 영향이 갔는지 브라우저에게 알려주는것

    // 2. 소프트 삭제(직접구현) isDeleted
    // this.productsRepository.update({ id: productId }, { isDeleted: true });

    // 3. 소프트 삭제(직접구현) - deletedAt
    // this.productsRepository.update(
    //   { id: productId },
    //   { deletedAt: new Date() },
    // );

    //4. 소프트 삭제(TypeORM제공) - softRemove
    // this.productsRepository.softRemove({ id: productId });
    // 단점: id로만 삭제 가능
    // 장점: 여러ID 한번에 지우기 가능
    // softRemove([{id:qqq},{id: aaa},{id:zzz}])

    //5. 소프트 삭제(TYpeORM제공) - softDelete
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false;
    // 단점: 여러id로만 삭제 가능
    // 장점: 여러ID 한번에 지우기 가능
    // softRemove([{id:qqq},{id: aaa},{id:zzz}])
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
