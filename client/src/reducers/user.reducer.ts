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
