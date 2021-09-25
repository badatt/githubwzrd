import { createReducer } from 'modules/helpers';

import { SettingsActionTypes, STATUS } from 'literals';

import { ISettingsState } from 'types/settings.type';

export const settingsState: ISettingsState = {
  loadingReposStatus: STATUS.IDLE,
  savingReposStatus: STATUS.IDLE,
  repos: {},
};

export default {
  settings: createReducer<ISettingsState>(
    {
      [SettingsActionTypes.SETTINGS_GET_REPOS_REQUEST]: (draft: ISettingsState, {}) => {
        draft.loadingReposStatus = STATUS.RUNNING;
        draft.repos = {};
      },
      [SettingsActionTypes.SETTINGS_GET_REPOS_SUCCESS]: (draft: ISettingsState, { payload }) => {
        draft.repos = payload;
        draft.loadingReposStatus = STATUS.SUCCESS;
      },
      [SettingsActionTypes.SETTINGS_GET_REPOS_FAILURE]: (draft: ISettingsState, {}) => {
        draft.loadingReposStatus = STATUS.ERROR;
      },
      [SettingsActionTypes.SETTINGS_SAVE_USER_REPOS_REQUEST]: (draft: ISettingsState, {}) => {
        draft.savingReposStatus = STATUS.RUNNING;
      },
      [SettingsActionTypes.SETTINGS_SAVE_USER_REPOS_SUCCESS]: (draft: ISettingsState, {}) => {
        draft.savingReposStatus = STATUS.SUCCESS;
      },
      [SettingsActionTypes.SETTINGS_SAVE_USER_REPOS_FAILURE]: (draft: ISettingsState, {}) => {
        draft.savingReposStatus = STATUS.ERROR;
      },
    },
    settingsState,
  ),
};
