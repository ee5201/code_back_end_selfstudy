import { ConflictException, Injectable } from '@nestjs/common';
import {
  IUsersServiceCreate,
  IUsersServiceFindOneByEmail,
} from './Interfaces/users-service';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {} // Moudle에 있는 User은 어디든 받을 수 있지만 service에 받는 이유는 서비스에서 검증을 하고 DB에 저장해야하기 때문에 그래서 서비스에서 하는것이다.

  findOneByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create({
    email,
    password,
    name,
    age,
  }: IUsersServiceCreate): Promise<User> {
    const user = await this.findOneByEmail({ email });
    if (user) throw new ConflictException('이미 등록된 이메일 입니다. ');

    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.save({
      email: email,
      password: hashedPassword,
      name: name,
      age: age,
    });
  }
}
