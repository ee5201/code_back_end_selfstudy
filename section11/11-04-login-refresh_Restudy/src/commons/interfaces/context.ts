import { Request, Response } from 'express';
import { User } from 'src/apis/users/entities/user.entity';

export interface IAuthUser {
  user?: {
    id: string;
  };
}

export interface IContext {
  req: Request & IAuthUser;
  res: Response;
}
export interface IAuthServiceRefreshToken {
  user: User;
  context: IContext;
}
