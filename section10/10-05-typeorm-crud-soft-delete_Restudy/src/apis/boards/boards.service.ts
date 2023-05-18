import { Injectable, Scope } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/create-board.input';
import { IBoardsServiceCreate } from './interfaces/boards-service.interfacet';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// 인젝션-스코프 => 싱글톤(new 한번) 으로 할래 말래?
//                      Request 스코프(매 요청마다 new )로 할래?
//                      Transient 스코프 ()

@Injectable({ scope: Scope.DEFAULT })
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly BoardRepository: Repository<Board>,
  ) {}
  findAll(): Promise<Board[]> {
    return this.BoardRepository.find();
  }
  create({ createBoardInput }: IBoardsServiceCreate): Promise<Board> {
    const result = this.BoardRepository.save({
      ...createBoardInput,
    });
    return result;
  }
}
