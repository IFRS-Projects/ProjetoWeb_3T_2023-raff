export type userType = {
  id: string;
  name: string;
  email: string;
  password: string;
  permissions: Permission[];
  created_at: Date;
  updated_at: Date;
} 

export type createUserType = {
  name: string;
  email: string;
  password: string;
}

export interface updateUserType extends Partial<userType> { }

export type userLogin = {
  email: string,
  password:string
}

export type userDataType = {
  sub: string,
  username: string,
  email: string,
  permissions: Permission[],
}
export enum Permission {
  'LIST_USERS'
} 