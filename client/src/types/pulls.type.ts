import { ValueOf } from 'type-fest';
import { IReposPageInfo } from 'types';
import { IStatus } from './common.type';

export interface IPull {
  title: string;
  url: string;
  assignedToMe?: boolean;
  reviewRequiredByMe?: boolean;
  createdByMe?: boolean;
}

export interface IRelatedPullData {
  repoName: string;
  repoUrl: string;
  pulls?: IPull[];
}

export interface IRelatedPull {
  data?: IRelatedPullData[];
  pageInfo?: IReposPageInfo;
}

export interface IPullsState {
  loadingPullsStatus?: ValueOf<IStatus>;
  relatedPulls?: IRelatedPull;
}
