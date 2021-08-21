import { createReducer } from 'modules/helpers';

import { SettingsActionTypes, STATUS } from 'literals';

import { SettingsState } from 'types/settings.type';

export const settingsState: SettingsState = {
  status: STATUS.IDLE,
  repos: [],
};

export default {
  settings: createReducer<SettingsState>(
    {
      [SettingsActionTypes.SETTINGS_GET_REPOS_REQUEST]: (draft: SettingsState, {}) => {
        draft.status = STATUS.RUNNING;
      },
      [SettingsActionTypes.SETTINGS_GET_REPOS_SUCCESS]: (draft, { payload }) => {
        draft.repos = payload;
        draft.status = STATUS.SUCCESS;
      },
      [SettingsActionTypes.SETTINGS_GET_REPOS_FAILURE]: (draft, {}) => {
        draft.status = STATUS.ERROR;
      },
    },
    settingsState,
  ),
};
