import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { IFindOneByEmail, IUserServiceCreate } from './interface/userService';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRpository: Repository<User>,
  ) {}

  findOneByEmail({ email }: IFindOneByEmail): Promise<User> {
    return this.UserRpository.findOne({ where: { email } });
  }

  async create({
    email,
    password,
    name,
    age,
  }: IUserServiceCreate): Promise<User> {
    const user = await this.findOneByEmail({ email });

    if (user) throw new ConflictException('이미 등록된 이메일입니다. ');
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.UserRpository.save({
      email,
      password: hashedPassword,
      name,
      age,
    });
  }
}
