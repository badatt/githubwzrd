import { createReducer } from 'modules/helpers';

import { PullsActionTypes, STATUS } from 'literals';

import { IPullsState } from 'types/pulls.type';

export const pullsState: IPullsState = {
  loadingPullsStatus: STATUS.IDLE,
  relatedPullData: {},
};

export default {
  pulls: createReducer<IPullsState>(
    {
      [PullsActionTypes.PULLS_GET_ALL_REQUEST]: (draft: IPullsState, {}) => {
        draft.loadingPullsStatus = STATUS.RUNNING;
        draft.relatedPullData = {};
      },
      [PullsActionTypes.PULLS_GET_ALL_SUCCESS]: (draft: IPullsState, { payload }) => {
        draft.relatedPullData = payload;
        draft.loadingPullsStatus = STATUS.SUCCESS;
      },
      [PullsActionTypes.PULLS_GET_ALL_FAILURE]: (draft: IPullsState, { payload }) => {
        draft.loadingPullsStatus = STATUS.ERROR;
        draft.error = payload;
      },
    },
    pullsState,
  ),
};
