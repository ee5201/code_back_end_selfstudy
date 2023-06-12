import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  getHello(): string {
    return 'Hello World!';
  }
}
// injection scope => 인젝션 - 스코프 => 싱글톤(new 한번)으로 할래 말래
