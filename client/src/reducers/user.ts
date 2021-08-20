import { createReducer } from 'modules/helpers';

import { ActionTypes, STATUS } from 'literals';

import { UserState } from 'types/user.type';

export const userState: UserState = {
  status: STATUS.IDLE,
  data: {},
};

export default {
  user: createReducer<UserState>(
    {
      [ActionTypes.USER_LOGIN_REQUEST]: draft => {
        draft.status = STATUS.RUNNING;
      },
      [ActionTypes.USER_LOGIN_SUCCESS]: draft => {
        draft.status = STATUS.READY;
      },
      [ActionTypes.USER_LOGOUT_REQUEST]: draft => {
        draft.status = STATUS.RUNNING;
      },
      [ActionTypes.USER_LOGOUT_SUCCESS]: draft => {
        draft.status = STATUS.IDLE;
      },
    },
    userState,
  ),
};
