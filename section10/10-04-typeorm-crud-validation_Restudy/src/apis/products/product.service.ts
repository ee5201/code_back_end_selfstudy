import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  IProductServiceChecksoldout,
  IProductServiceCreate,
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
}
