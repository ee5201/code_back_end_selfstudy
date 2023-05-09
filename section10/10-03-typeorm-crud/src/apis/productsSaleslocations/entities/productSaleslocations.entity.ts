import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductSaleslocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  addressDetail: string;

  @Column({ type: 'decimal', precision: 9, scale: 6 }) // 소수점자리와  9자리중에 6자리 소수점
  @Field(() => Float)
  lat: number; //위도

  @Column({ type: 'decimal', precision: 9, scale: 6 })
  @Field(() => Float)
  lng: number; //경도

  @Column()
  @Field(() => Date)
  meetingTime: Date;
}
