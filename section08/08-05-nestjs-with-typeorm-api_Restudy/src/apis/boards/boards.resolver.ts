import { BoardsService } from './boards.service';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/create-board.input';
import { TestInput } from './dto/test';

@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardService: BoardsService, //
  ) {}

  // @Get('/products/buy') // get('/')의미
  @Query(() => [Board], { nullable: true }) // graphql에서는 [ ...]안에 해야한다. ...[]은 못한다.
  fetchBoards(): Board[] {
    return this.boardService.findAll();
  }

  @Mutation(() => String, { nullable: true }) // graphql를 자동으로 만들기 위한 것
  createBoard(
    //
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args('contents') contents: string,
    @Args('createBoardInput', { nullable: true })
    createBoardInput: CreateBoardInput,
  ): string {
    return this.boardService.create({ createBoardInput });
  }

  @Mutation(() => String, { nullable: true })
  Test(
    @Args('test', { nullable: true })
    testInput: TestInput,
    @Args('qqq', { nullable: true })
    qqq: string,
  ): string {
    return this.boardService.test({ testInput, qqq });
  }

  @Mutation(() => String, { nullable: true })
  BoardTest(
    @Args('writer', { nullable: true })
    writer: string,
    @Args('title', { nullable: true })
    title: string,
    @Args('contents', { nullable: true })
    contents: string,
  ): string {
    return this.boardService.BoardTest({ writer, title, contents });
  }
}
