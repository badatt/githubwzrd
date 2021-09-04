import { createReducer } from 'modules/helpers';

import { UserActionTypes, STATUS } from 'literals';

import { IUserState } from 'types/user.type';

export const userState: IUserState = {
  status: STATUS.IDLE,
  data: {},
};

export default {
  user: createReducer<IUserState>(
    {
      [UserActionTypes.USER_SET_REPOS]: (draft: IUserState, { payload }) => {
        draft.data.repos = payload;
      },
      [UserActionTypes.USER_ADD_REPO]: (draft: IUserState, { payload }) => {
        if (draft.data.repos && draft.data.repos.length >= 0) {
          draft.data.repos.push(payload.name);
        } else {
          draft.data.repos = [payload.name];
        }
      },
      [UserActionTypes.USER_GET_REQUEST]: (draft: IUserState, {}) => {
        draft.status = STATUS.RUNNING;
      },
      [UserActionTypes.USER_GET_SUCCESS]: (draft, { payload }) => {
        draft.data = payload;
        draft.status = STATUS.SUCCESS;
      },
      [UserActionTypes.USER_GET_FAILURE]: (draft, {}) => {
        draft.status = STATUS.ERROR;
      },
    },
    userState,
  ),
};
