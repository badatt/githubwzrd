import { createAction } from 'modules/helpers';

import { SettingsActionTypes } from 'literals';

export const getRepos = createAction(SettingsActionTypes.SETTINGS_GET_REPOS_REQUEST, () => ({}));
