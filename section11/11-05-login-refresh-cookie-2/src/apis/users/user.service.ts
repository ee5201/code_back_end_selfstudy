import { ConflictException, Injectable } from '@nestjs/common';
import {
  IUserSercieCreate,
  IUsersServiceFindOneByEmail,
} from './interfaces/UserserivceInput';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  findOnByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User> {
    return this.UserRepository.findOne({
      where: {
        email,
      },
    });
  }

  async create({
    email,
    password,
    name,
    age,
  }: IUserSercieCreate): Promise<User> {
    const user = await this.findOnByEmail({ email });
    if (user) throw new ConflictException('이미 등록된 이메일 입니다. ');
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.UserRepository.save({
      email,
      password: hashedPassword,
      name,
      age,
    });
  }
}
