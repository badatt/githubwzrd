import { createAction } from 'modules/helpers';

import { PullsActionTypes } from 'literals';

export const getPulls = createAction(PullsActionTypes.PULLS_GET_ALL_REQUEST, () => ({}));
export const getPull = createAction(
  PullsActionTypes.PULLS_GET_BY_REPO_REQUEST,
  (repo?: string) => ({ repo }),
);
