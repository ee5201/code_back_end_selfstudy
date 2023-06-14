import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import {
  IProductServiceCheckSOldout,
  IProductServiceFindOne,
  IProductServicecreate,
  IproductServiceDelete,
} from './interface/productServicecreate';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IproductServiceUpdate } from './interface/productServicecreate';
import { ProductSaleslocationService } from '../productsSaleslocations/productSaleslocation.service';

@Injectable()
export class Productservice {
  constructor(
    @InjectRepository(Product)
    private readonly ProductRepository: Repository<Product>,
    private readonly productSaleslocationService: ProductSaleslocationService,
  ) {}
  findAll(): Promise<Product[]> {
    return this.ProductRepository.find({
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  findOne({ productId }: IProductServiceFindOne): Promise<Product> {
    return this.ProductRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  checkSoldOut({ product }: IProductServiceCheckSOldout): void {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상태 입니다.');
    }
  }

  async create({
    createProductInput,
  }: IProductServicecreate): Promise<Product> {
    // const result = this.ProductRepository.save({
    //   // name:
    //   ...createProductInput,
    // });
    // return result;

    const { productSaleslocation, productCategoryId, ...product } =
      createProductInput;
    const result = await this.productSaleslocationService.create({
      productSaleslocation,
    });

    const result2 = await this.ProductRepository.save({
      ...product,
      productSaleslocation: result,
      productCategory: {
        id: productCategoryId,
      },
    });

    return result2;
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

  async delete({ productId }: IproductServiceDelete): Promise<boolean> {
    const result = this.ProductRepository.softDelete({
      id: productId,
    });
    return (await result).affected ? true : false;
  }
}
