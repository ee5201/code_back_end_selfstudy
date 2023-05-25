export interface IUserServiceCreate {
  email: string;
  password: string;
  name: string;
  age: number;
}

export interface IFindOneByEmail {
  email: string;
}
