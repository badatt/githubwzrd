import { createReducer } from 'modules/helpers';

import { UserActionTypes, STATUS } from 'literals';

import { UserState } from 'types/user.type';

export const userState: UserState = {
  status: STATUS.IDLE,
  data: {},
};

export default {
  user: createReducer<UserState>(
    {
      [UserActionTypes.USER_GET_REQUEST]: (draft: UserState, { payload }) => {
        draft.status = STATUS.RUNNING;
      },
      [UserActionTypes.USER_GET_SUCCESS]: (draft, { payload }) => {
        draft.data = payload;
        draft.status = STATUS.SUCCESS;
      },
      [UserActionTypes.USER_GET_FAILURE]: (draft, { payload }) => {
        draft.status = STATUS.ERROR;
      },
    },
    userState,
  ),
};
