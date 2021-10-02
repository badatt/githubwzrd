import { createAction } from 'modules/helpers';

import { UserActionTypes } from 'literals';
import { IRateLimit } from 'types';

export const getUser = createAction(UserActionTypes.USER_GET_REQUEST, () => ({}));

export const setRepos = createAction(UserActionTypes.USER_SET_REPOS, (repos: string[]) => ({
  repos,
}));

export const addRepo = createAction(UserActionTypes.USER_ADD_REPO, (name?: string) => ({
  name,
}));

export const removeRepo = createAction(UserActionTypes.USER_REMOVE_REPO, (name?: string) => ({
  name,
}));

export const signup = createAction(UserActionTypes.USER_SIGNUP_REQUEST, () => ({}));

export const updateRateLimit = createAction(
  UserActionTypes.USER_RATE_LIMIT_SUCCESS,
  (rateLimit: IRateLimit) => ({ rateLimit }),
);
