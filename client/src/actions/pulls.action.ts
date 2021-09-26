import { createAction } from 'modules/helpers';

import { PullsActionTypes } from 'literals';

export const getPulls = createAction(PullsActionTypes.PULLS_GET_ALL_REQUEST, () => ({}));
