import { createAction } from 'modules/helpers';

import { SettingsActionTypes } from 'literals';

export interface IGetReposRequest {
  after?: string;
  before?: string;
}

export const setUserRepos = createAction(
  SettingsActionTypes.SETTINGS_SET_USER_REPOS,
  (repos: string[]) => ({ repos }),
);

export const getRepos = createAction(
  SettingsActionTypes.SETTINGS_GET_REPOS_REQUEST,
  (getReposRequest?: IGetReposRequest) => ({ ...getReposRequest }),
);

export const saveUserRepos = createAction(
  SettingsActionTypes.SETTINGS_SAVE_USER_REPOS_REQUEST,
  (repos: string[]) => ({ repos }),
);
