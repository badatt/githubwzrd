import { ValueOf } from 'type-fest';
import { Status } from './common.type';

export interface ReposData {
  description?: string;
  isArchived?: boolean;
  name?: string;
  url?: string;
}

export interface SettingsState {
  status: ValueOf<Status>;
  repos: ReposData[];
}
