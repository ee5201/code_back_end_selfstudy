import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  IProductServiceChecksoldout,
  IProductServiceCreate,
  IProductServiceDelete,
  IProductServiceUpdate,
} from './interface/productServicesinterface';
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

  checksoldout({ product }: IProductServiceChecksoldout): void {
    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다. ');
    }
  }

  create({ createProductInput }: IProductServiceCreate): Promise<Product> {
    const result = this.ProductServiceRepository.save({
      ...createProductInput,
    });
    return result;
  }

  async update({ productId, updateProductInput }: IProductServiceUpdate) {
    const product = await this.findOne({ productId });

    this.checksoldout({ product });

    // 검증은 서비스에서 한다 서비스는 재사용하기 때문에

    const result = this.ProductServiceRepository.save({
      ...product, // 수정 후 수정되지 않은 다른 결과값까지 모두 객체로 돌려받고 싶을때
      ...updateProductInput,
    });
    return result;
  }

  async delete({ productId }: IProductServiceDelete): Promise<boolean> {
    //1. 실제 삭제
    // const result = await this.ProductServiceRepository.delete({
    //   id: productId,
    // });
    // return result.affected ? true : false; // affected는 브라우저로 삭제가 됐는지 확인 하게 도와주는것이다.
    //
    //2. 소프트 삭제 - isDeleted
    // this.ProductServiceRepository.delete({ id: productId }, { isDelete: true });
    //이것을 사용할 경우 findone 즉 조회 에서 수정해야한다.
    // findOne({where:{isDeleted: false}})로 해주어 사용자는 안보이지만 실제로 데이터베이스에 저장되어 있다.
    //
    //3. 소프트 삭제 - deletedAt
    // this.ProductServiceRepository.update(
    //   { id: productId },
    //   { deletedAt: new Date() },
    // );
    //이것은 날짜를 적어 날짜가 적혀있는건 삭제 적혀있지 않은건 삭제 안함으로 구별할 수 있으며 동일하게 findOne도 수정해야한다.
    //findOne({where:{deletedAt:null}})
    //
    //4. 소프트 삭제(typeOrm제공) -소프트삭제 softRemove
    //단점: id로만 삭제 가능
    //장점: 여러 ID 한번에 지우기 가능
    // .softRemove({id:qqq},{id:aaa},{id:rrr})
    // this.ProductServiceRepository.softRemove({ id: productId });
    //
    //5. 소프트 삭제(typeOrm제공) -소프트삭제 softDelete
    //단점:여러ID 한번에 지우기불가능
    //장점: 다른 컬럼으로도 삭제 가능
    const result = await this.ProductServiceRepository.softDelete({
      id: productId,
    });
    return result.affected ? true : false;
  }
}