import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from './boards.service';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/create-board.input';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {}

  @Query(() => [Board], { nullable: true })
  getHello(): Board[] {
    return this.boardService.findAll();
  }

  @Mutation(() => String, { nullable: true })
  createBoards(
    @Args({ name: 'createBoardInput', nullable: true })
    createBoardInput: CreateBoardInput,
  ): string {
    return this.boardService.create({ createBoardInput });
  }
}
