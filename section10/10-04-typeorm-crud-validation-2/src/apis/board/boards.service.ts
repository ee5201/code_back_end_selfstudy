import { Injectable } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { ICREATEBOARD } from './boards.interface';

@Injectable()
export class BoardService {
  findAll(): Board[] {
    const result = [
      {
        number: 1,
        writer: '철수',
        title: '제목입니다.',
        contents: '내용이에요',
        Phone: '01012345678',
      },
      {
        number: 2,
        writer: '훈수',
        title: '훈제목입니다.',
        contents: '훈내용이에요',
        Phone: '01012345278',
      },
      {
        number: 3,
        writer: '김수',
        title: '김제목입니다.',
        contents: '김내용이에요',
        Phone: '01012345378',
      },
    ];
    return result;
  }

  create({ createBoardInput }: ICREATEBOARD): string {
    console.log(createBoardInput.writer);
    console.log(createBoardInput.title);
    console.log(createBoardInput.contents);
    return '게시물 등록 성공';
  }
}
// injection scope => 인젝션 - 스코프 => 싱글톤(new 한번)으로 할래 말래
