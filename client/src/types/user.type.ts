import { ValueOf } from 'type-fest';
import { IStatus } from './common.type';

export interface IUserData {
  avatarUrl?: string;
  id?: string;
  name?: string;
  org?: string;
  repos?: string[];
  url?: string;
}

export interface IUserState {
  status: ValueOf<IStatus>;
  data: IUserData;
}
