import { createReducer } from 'modules/helpers';

import { PullsActionTypes, STATUS } from 'literals';

import { IPullsState } from 'types/pulls.type';

export const pullsState: IPullsState = {
  loadingPullsStatus: STATUS.IDLE,
  relatedPulls: {},
};

export default {
  pulls: createReducer<IPullsState>(
    {
      [PullsActionTypes.PULLS_GET_ALL_REQUEST]: (draft: IPullsState, {}) => {
        draft.loadingPullsStatus = STATUS.RUNNING;
        draft.relatedPulls = {};
      },
      [PullsActionTypes.PULLS_GET_ALL_SUCCESS]: (draft: IPullsState, { payload }) => {
        draft.relatedPulls = payload;
        draft.loadingPullsStatus = STATUS.SUCCESS;
      },
      [PullsActionTypes.PULLS_GET_ALL_FAILURE]: (draft: IPullsState, {}) => {
        draft.loadingPullsStatus = STATUS.ERROR;
      },
    },
    pullsState,
  ),
};