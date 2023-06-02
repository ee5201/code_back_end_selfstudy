import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../user.service';
import { UsersResolver } from '../user.resolver';
import { User } from '../entities/user.entity';

describe('UsersResolver', () => {
  let userResolver: UsersResolver;
  beforeEach(async () => {
    //로그인 등 공통 기능
    // const user: TestingModule = await Test.createTestingModule({
    //   providers: [UsersService, UsersResolver],
    // }).compile();
    // userResolver = user.get<UsersResolver>(UsersResolver);
  });

  describe('fetchUser', () => {
    it('유저 정보 가져오기 ', () => {
      // expect(userResolver.fetchUser('인가')).toBe();
    });
  });

  describe('createUser', () => {
    it('유저 정보 가져오기 ', () => {
      //
    });
  });
});
