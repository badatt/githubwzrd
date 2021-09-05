import { createReducer } from 'modules/helpers';

import { UserActionTypes, STATUS } from 'literals';

import { IUserState } from 'types/user.type';

export const userState: IUserState = {
  status: STATUS.IDLE,
  data: {},
  error: {},
};

export default {
  user: createReducer<IUserState>(
    {
      [UserActionTypes.USER_SET_REPOS]: (draft: IUserState, { payload }) => {
        draft.data.repos = payload;
      },
      [UserActionTypes.USER_ADD_REPO]: (draft: IUserState, { payload }) => {
        if (draft.data.repos) {
          draft.data.repos.push(payload.name);
        } else {
          draft.data.repos = [payload.name];
        }
      },
      [UserActionTypes.USER_REMOVE_REPO]: (draft: IUserState, { payload }) => {
        draft.data.repos?.splice(draft.data.repos.indexOf(payload.name), 1);
      },
      [UserActionTypes.USER_GET_REQUEST]: (draft: IUserState, {}) => {
        draft.status = STATUS.RUNNING;
      },
      [UserActionTypes.USER_GET_SUCCESS]: (draft, { payload }) => {
        draft.data = payload;
        draft.status = STATUS.SUCCESS;
      },
      [UserActionTypes.USER_GET_FAILURE]: (draft, { payload }) => {
        draft.status = STATUS.ERROR;
        draft.error = payload;
      },
      [UserActionTypes.USER_SIGNUP_REQUEST]: (draft, {}) => {
        draft.status = STATUS.RUNNING;
      },
      [UserActionTypes.USER_SIGNUP_SUCCESS]: (draft, {}) => {
        draft.status = STATUS.SUCCESS;
      },
      [UserActionTypes.USER_SIGNUP_FAILURE]: (draft, { payload }) => {
        draft.status = STATUS.ERROR;
        draft.error = payload;
      },
    },
    userState,
  ),
};
