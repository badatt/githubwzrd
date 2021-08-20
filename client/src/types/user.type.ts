import { ValueOf } from 'type-fest';
import { Status } from './common.type';

export interface UserData {
  avatarUrl?: string;
  id?: string;
  name?: string;
  org?: string;
  repos?: string[];
  url?: string;
}

export interface UserState {
  status: ValueOf<Status>;
  data: UserData;
}
