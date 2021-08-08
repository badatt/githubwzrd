import { createAction } from 'modules/helpers';

import { ActionTypes } from 'literals';

export const getOrgRepos = createAction(ActionTypes.SETTINGS_GET_REPOS_REQUEST, () => ({}));
