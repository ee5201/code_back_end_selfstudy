import { Test } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { UsersResolver } from '../user.resolver';
import { UsersService } from '../user.service';
import { ConflictException } from '@nestjs/common';
import { User } from '../entities/user.entity';

//나만의 데이터베이스 만들기
class MockUsersRepository {
  mydb = [
    { email: 'QQQ@QQQ.com', password: '0000', name: '짱구', age: 8 },
    { email: 'aa@aa.com', password: '1234', name: '철수', age: 8 },
  ];

  findOne({ where }) {
    const users = this.mydb.filter((el) => el.email === where.email);
    if (users.length) return users[0];
    return null;
  }

  save({ email, password, name, age }) {
    this.mydb.push({ email, password, name, age });
    return { email, password, name, age };
  }
}

describe('UsersService', () => {
  let usersService: UsersService;
  beforeEach(async () => {
    //로그인 등 공통 기능
    const usersMoudle = await Test.createTestingModule({
      // imports:[TypeOrmModule...],
      // controllers:[]
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUsersRepository,
        },
      ],
    }).compile();
    usersService = usersMoudle.get<UsersService>(UsersService);
  });

  // describe('findOneByEmail', () => {
  //   it('유저 정보 가져오기 ', () => {
  //     const result = usersService.findOneByEmail({ email: 'a@a.com' });
  //     expect(result).toStrictEqual({
  //       email: "a@a.com",
  //       name: "짱구",
  //       ...
  //     })
  //   });
  // });

  describe('create', () => {
    it('유저 정보 가져오기 ', async () => {
      const myData = {
        email: 'bbb@bbb.com',
        password: '1234',
        name: '철수',
        age: 12,
      };

      try {
        await usersService.create({ ...myData });
      } catch (error) {
        console.log(error);
        expect(error).toBeInstanceOf(ConflictException);
      }
    });

    it('회원등록 잘 됐는지 검증!! ', async () => {
      const myData = {
        email: 'b@b.com',
        password: '1234',
        name: '철수',
        age: 12,
      };
      const result = await usersService.create({ ...myData });
      const { password, ...rest } = result;
      expect(rest).toStrictEqual({
        email: 'b@b.com',
        name: '철수',
        age: 12,
      });
    });
  });
});
