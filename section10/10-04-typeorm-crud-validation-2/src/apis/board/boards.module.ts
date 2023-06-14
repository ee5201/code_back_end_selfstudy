import { Module } from '@nestjs/common';

import { BoardService } from './boards.service';
import { BoardResolver } from './boards.resolver';

@Module({
  imports: [],
  providers: [BoardService, BoardResolver], // new AppController 같은 의미
})
export class BoardModule {}
