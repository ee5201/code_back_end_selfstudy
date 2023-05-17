import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() //typeorm에서 제공하는것 //mysQl위한 것
// graphql을 위한 것을 하나더 생성 해야한다.
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn('increment') //타이틀을 컬럼으로 만들기 uuid= 무작위 id increment 1,2,3증가형
  @Field(() => Int)
  number: number;

  @Column()
  @Field(() => String)
  writer: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  contents: string;
}
