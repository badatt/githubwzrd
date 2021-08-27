import { ValueOf } from 'type-fest';
import { Status } from './common.type';

export interface ReposData {
  description?: string;
  isArchived?: boolean;
  name?: string;
  url?: string;
}

export interface SettingsState {
  loadingReposStatus: ValueOf<Status>;
  savingReposStatus: ValueOf<Status>;
  repos: ReposData[];
}
