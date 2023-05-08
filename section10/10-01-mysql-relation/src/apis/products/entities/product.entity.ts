import { Field, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategories.entity';
import { ProductSaleslocation } from 'src/apis/productsSaleslocations/entities/productSaleslocations.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productTags.entity';
import { ProductsUser } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Number)
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  @JoinColumn() //한곳만 하면 된다.
  @OneToOne(() => ProductSaleslocation) //onetoone 1대1 연결 ProductSaleslocation연결을 할것이다. 타입은 아래와 같다.
  productSaleslocation: ProductSaleslocation; //FK

  @ManyToOne(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => ProductsUser)
  user: ProductsUser;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products) //manyto many는 반대편을 사용하는것을 작성해야한다.
  productTags: ProductTag[]; //객체가 여러개에 있는 배열 타입
}
