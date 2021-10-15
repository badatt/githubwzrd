import { ValueOf } from 'type-fest';
import { IError, IRateLimit, IReposPageInfo } from 'types';
import { IStatus } from './common.type';

export interface IPull {
  title: string;
  url: string;
  assignedToMe?: boolean;
  reviewRequiredByMe?: boolean;
  createdByMe?: boolean;
}

export interface IRelatedPull {
  repoName: string;
  repoUrl: string;
  anyAssignedToMe?: boolean;
  anyReviewRequiredByMe?: boolean;
  anyCreatedByMe?: boolean;
  pulls?: IPull[];
}

export interface IRelatedPullData {
  data?: IRelatedPull[];
  pageInfo?: IReposPageInfo;
  rateLimit?: IRateLimit;
}

export interface IPullsState {
  loadingPullsStatus?: ValueOf<IStatus>;
  relatedPullData?: IRelatedPullData;
  error?: IError;
}
