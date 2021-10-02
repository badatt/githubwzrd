import { ValueOf } from 'type-fest';
import { IRateLimit, IReposPageInfo, IStatus } from 'types';

export interface IReposData {
  description?: string;
  isArchived?: boolean;
  name?: string;
  id?: string;
  url?: string;
}

export interface IRepos {
  data?: IReposData[];
  pageInfo?: IReposPageInfo;
  rateLimit?: IRateLimit;
}

export interface ISettingsState {
  loadingReposStatus: ValueOf<IStatus>;
  savingReposStatus: ValueOf<IStatus>;
  repos: IRepos;
}
