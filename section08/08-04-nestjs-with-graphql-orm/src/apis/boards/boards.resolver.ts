import { BoardService } from './boards.service';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardService: BoardService, //
  ) {}

  // @Get('/products/buy') // get('/')의미
  @Query(() => String, { nullable: true })
  getHello(): string {
    return this.boardService.qqq();
  }
}
