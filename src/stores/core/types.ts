export type UserId = string;
export type UserName = string;

export interface User {
  id: UserId;
  username: UserName;
}

export interface CoreState {
  user: User | null;
}

export enum CoreActionTypes {
  LOGIN = '@@core/LOGIN',
  LOGOUT = '@@core/LOGOUT',
  SET_USER = '@@core/SET_USER'
}
