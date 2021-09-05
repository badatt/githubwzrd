import { all, call, put, takeLatest } from 'redux-saga/effects';
import { UserActionTypes } from 'literals';
import api, { IApi } from 'modules/requests';

export function* getUser({ get }: IApi): Generator {
  try {
    const user: any = yield call(get, '/me');
    yield put({
      type: UserActionTypes.USER_GET_SUCCESS,
      payload: user.data,
    });
  } catch (err) {
    yield put({
      type: UserActionTypes.USER_GET_FAILURE,
      payload: err,
    });
  }
}

/**
 * User Sagas
 */
export default function* root() {
  yield all([takeLatest(UserActionTypes.USER_GET_REQUEST, getUser, api)]);
}
