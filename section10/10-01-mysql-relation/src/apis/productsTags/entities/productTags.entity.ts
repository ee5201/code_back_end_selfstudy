import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Products } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToMany(() => Products, (Products) => Products.productTags)
  products: Products;
}
