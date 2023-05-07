import { Module } from '@nestjs/common';
import { BoardsResolver } from './boards.resolver';
import { BoardService } from './boards.service';

@Module({
  imports: [],
  providers: [
    BoardsResolver, //
    BoardService,
  ], // new AppController 같은 의미
})
export class BoardsMoudle {}
