import { User } from 'src/apis/users/entities/user.entity';
import { IAuthUser } from 'src/commons/interfaces/context';
import { IContext } from 'src/commons/interfaces/context';

export interface IAuthServiceLogin {
  email: string;
  password: string;
  context: IContext;
}

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUser['user'];
}

export interface IAuthServiceRestoreAccessToken {
  user: IAuthUser['user'];
}
