import { createAction } from 'modules/helpers';

import { UserActionTypes } from 'literals';

export const getUser = createAction(UserActionTypes.USER_GET_REQUEST, () => ({}));
