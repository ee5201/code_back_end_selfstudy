import { Injectable, Scope } from '@nestjs/common';
import { Board } from './entities/board.entity';
import { CreateBoardInput } from './dto/create-board.input';
import { IBoardsServiceCreate } from './interfaces/boards-service.interfacet';

// 인젝션-스코프 => 싱글톤(new 한번) 으로 할래 말래?
//                      Request 스코프(매 요청마다 new )로 할래?
//                      Transient 스코프 ()

@Injectable({ scope: Scope.DEFAULT })
export class BoardsService {
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
  // create(writer: string, title: string, contents: string): string {
  //   // 1. 브라우저에서 보내준 데이터 확인하기
  //   console.log(writer);
  //   console.log(title);
  //   console.log(contents);

  //   // 2. db에 접속후, 데이터를 저장 => 데이터 저장했다

  //   //3. db에 저장된 결과를 브라우저에 응답(response)
  //   return '게시물 등록하였습니다.';
  // }
  create({ createBoardInput }: IBoardsServiceCreate): string {
    // 1. 브라우저에서 보내준 데이터 확인하기
    console.log(createBoardInput.writer);
    console.log(createBoardInput.title);
    console.log(createBoardInput.contents);

    // 2. db에 접속후, 데이터를 저장 => 데이터 저장했다

    //3. db에 저장된 결과를 브라우저에 응답(response)
    return '게시물 등록하였습니다.';
  }
}
