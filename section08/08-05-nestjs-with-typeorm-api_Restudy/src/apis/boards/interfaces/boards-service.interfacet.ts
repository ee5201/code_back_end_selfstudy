import { CreateBoardInput } from '../dto/create-board.input';
import { TestInput } from '../dto/test';

export interface IBoardsServiceCreate {
  createBoardInput: CreateBoardInput;
}

export interface IBoardsServiceTest {
  testInput: TestInput;
  qqq: string;
}
