import { Field, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productsSaleslocations/entities/productSaleslocations.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productTags.entity';
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
export class Products {
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
  @Field(() => Number)
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  @JoinColumn() //한곳만 하면 된다.
  @OneToOne(() => ProductSaleslocation) //onetoone 1대1 연결 ProductSaleslocation연결을 할것이다. 타입은 아래와 같다.
  @Field(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation; //FK

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products) //manyto many는 반대편을 사용하는것을 작성해야한다.
  @Field(() => [ProductTag])
  productTags: ProductTag[]; //객체가 여러개에 있는 배열 타입

  @CreateDateColumn() //데이터 등록시 등록 시간 자동으로 추가
  createAt: Date;

  @UpdateDateColumn() //데이터 수정시 수정 시간 자동으로 추가
  updateeAt: Date;
  @DeleteDateColumn() //소프트 삭제 시간 기록 을 위함 softDelete을 위한 것
  deletedAt: Date;
}
