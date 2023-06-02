import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

class MockAppService {
  getHello(): string {
    return 'Hello World!';
  }
}

describe('AppController', () => {
  let appController: AppController;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useClass: MockAppService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController); // 동일 == new AppController(appService);
  });

  describe('gethello 테스트 하기', () => {
    it('이 테스트의 검증 결과는 hello world를 리턴해야함', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
  // describe('fetchBoards 테스트하기 ', () => {
  //   second;
  // });
});
