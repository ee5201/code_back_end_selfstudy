import { BoardsService } from './boards.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/create-board.input';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject } from '@nestjs/common';

@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardService: BoardsService, //
    @Inject(CACHE_MANAGER)
    private readonly cacheManger: Cache,
  ) {}

  // @Get('/products/buy') // get('/')의미
  @Query(() => String, { nullable: true }) // graphql에서는 [ ...]안에 해야한다. ...[]은 못한다.
  async fetchBoards(): Promise<string> {
    //1. 캐시에서 조회하는 연습
    const mycache = await this.cacheManger.get('qqq');
    console.log(mycache);

    //2 . 조회완료 메시지 전달
    return '캐시에서 조회 완료 ';
    // return this.boardService.findAll();
  }

  @Mutation(() => String, { nullable: true }) // graphql를 자동으로 만들기 위한 것
  async createBoard(
    //
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args('contents') contents: string,
    @Args('createBoardInput', { nullable: true })
    createBoardInput: CreateBoardInput,
  ): Promise<string> {
    // 1. 캐시에 등록하는 연습
    await this.cacheManger.set('qqq', createBoardInput, {
      ttl: 1000,
    });
    //2. 등록 완료 메시지 전달
    return '캐시에 등록 완료 ';
    // return this.boardService.create({ createBoardInput });
  }
}
