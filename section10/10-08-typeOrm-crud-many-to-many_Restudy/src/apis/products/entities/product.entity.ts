import { Int, ObjectType } from '@nestjs/graphql';
import { Field } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { ProductSaleslocation } from 'src/apis/productsaleslocation/entities/productsaleslocation.entity';

import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  @JoinColumn() // 한번만 하면 된다.
  @OneToOne(() => ProductSaleslocation)
  @Field(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTag) => productTag.products)
  @Field(() => [ProductTag])
  productTags: ProductTag[];

  // @CreateDateColumn() // 데이터 등록시 등록시간 자동으로 추가
  // createdAt: Date;
  // @UpdateDateColumn() // 데이터 수정시 등록시간 자동으로 추가
  // updatedAt: Date;
  @DeleteDateColumn() // 소프트 삭제를 위한 기록을 위함
  deletedAt: Date;
}
