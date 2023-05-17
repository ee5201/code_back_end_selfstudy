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
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column({ default: false })
  isSoldout: boolean;

  @JoinColumn() // 한번만 하면 된다.
  @OneToOne(() => ProductSalesLocation)
  productSaleslocation: ProductSalesLocation;

  @ManyToOne(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  user: User;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTag) => productTag.products)
  productTag: ProductTag[];
}
