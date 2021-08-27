import { createReducer } from 'modules/helpers';

import { SettingsActionTypes, STATUS } from 'literals';

import { SettingsState } from 'types/settings.type';

export const settingsState: SettingsState = {
  loadingReposStatus: STATUS.IDLE,
  savingReposStatus: STATUS.IDLE,
  repos: [],
};

export default {
  settings: createReducer<SettingsState>(
    {
      [SettingsActionTypes.SETTINGS_GET_REPOS_REQUEST]: (draft: SettingsState, {}) => {
        draft.loadingReposStatus = STATUS.RUNNING;
      },
      [SettingsActionTypes.SETTINGS_GET_REPOS_SUCCESS]: (draft: SettingsState, { payload }) => {
        draft.repos = payload;
        draft.loadingReposStatus = STATUS.SUCCESS;
      },
      [SettingsActionTypes.SETTINGS_GET_REPOS_FAILURE]: (draft: SettingsState, {}) => {
        draft.loadingReposStatus = STATUS.ERROR;
      },
      [SettingsActionTypes.SETTINGS_SAVE_USER_REPOS_REQUEST]: (draft: SettingsState, {}) => {
        draft.savingReposStatus = STATUS.RUNNING;
      },
      [SettingsActionTypes.SETTINGS_SAVE_USER_REPOS_SUCCESS]: (draft: SettingsState, {}) => {
        draft.savingReposStatus = STATUS.SUCCESS;
      },
      [SettingsActionTypes.SETTINGS_SAVE_USER_REPOS_FAILURE]: (draft: SettingsState, {}) => {
        draft.savingReposStatus = STATUS.ERROR;
      },
    },
    settingsState,
  ),
};
