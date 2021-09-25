import { ValueOf } from 'type-fest';
import { IStatus, IError } from 'types';

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
  error: IError;
}
