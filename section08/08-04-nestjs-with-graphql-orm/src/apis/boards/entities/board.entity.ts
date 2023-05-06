import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() //typeorm에서 제공하는것
export class Board {
  @PrimaryGeneratedColumn('increment') //타이틀을 컬럼으로 만들기 uuid= 무작위 id increment 1,2,3증가형
  number: number;

  @Column()
  writer: string;

  @Column()
  title: string;

  @Column()
  contents: string;
}
