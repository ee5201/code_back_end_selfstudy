import { Int, ObjectType } from '@nestjs/graphql';
import { Field } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productCategories/entities/productCategory.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { ProductSalesLocation } from 'src/apis/productsaleslocation/entities/productsaleslocation.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
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
  @OneToOne(() => ProductSalesLocation)
  @Field(() => ProductSalesLocation)
  productSaleslocation: ProductSalesLocation;

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTag) => productTag.products)
  @Field(() => [ProductTag])
  productTag: ProductTag[];
}
