import { ValueOf } from 'type-fest';
import { IStatus } from './common.type';

export interface IReposData {
  description?: string;
  isArchived?: boolean;
  name?: string;
  id?: string;
  url?: string;
}

export interface IReposPageInfo {
  endCursor?: string;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  startCursor?: string;
}

export interface IRepos {
  data?: IReposData[];
  pageInfo?: IReposPageInfo;
}

export interface ISettingsState {
  loadingReposStatus: ValueOf<IStatus>;
  savingReposStatus: ValueOf<IStatus>;
  repos: IRepos;
}
