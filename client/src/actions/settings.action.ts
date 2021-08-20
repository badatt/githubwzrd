import { createAction } from 'modules/helpers';

import { SettingsActionTypes } from 'literals';

export const getOrgRepos = createAction(SettingsActionTypes.SETTINGS_GET_REPOS_REQUEST, () => ({}));
