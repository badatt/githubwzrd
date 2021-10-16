import { createReducer } from 'modules/helpers';

import { PullsActionTypes, STATUS } from 'literals';

import { IPullsState } from 'types/pulls.type';

export const pullsState: IPullsState = {
  relatedPullsData: {
    status: STATUS.IDLE,
  },
  relatedPullData: [],
};

export default {
  pulls: createReducer<IPullsState>(
    {
      [PullsActionTypes.PULLS_GET_ALL_REQUEST]: (draft: IPullsState, {}) => {
        draft.relatedPullsData = {
          status: STATUS.RUNNING,
        };
      },
      [PullsActionTypes.PULLS_GET_ALL_SUCCESS]: (draft: IPullsState, { payload }) => {
        draft.relatedPullsData = { ...payload, status: STATUS.SUCCESS };
      },
      [PullsActionTypes.PULLS_GET_ALL_FAILURE]: (draft: IPullsState, { payload }) => {
        draft.relatedPullsData = { error: payload, status: STATUS.ERROR };
      },
      [PullsActionTypes.PULLS_GET_BY_REPO_REQUEST]: (draft: IPullsState, { payload }) => {},
      [PullsActionTypes.PULLS_GET_BY_REPO_SUCCESS]: (draft: IPullsState, { payload }) => {
        console.log(payload);
        draft.relatedPullData = [
          ...draft.relatedPullData,
          {
            ...payload,
            status: STATUS.SUCCESS,
          },
        ];
      },
      [PullsActionTypes.PULLS_GET_BY_REPO_FAILURE]: (draft: IPullsState, { payload }) => {
        draft.relatedPullData = [
          ...draft.relatedPullData,
          {
            error: payload,
            status: STATUS.ERROR,
          },
        ];
      },
    },
    pullsState,
  ),
};
