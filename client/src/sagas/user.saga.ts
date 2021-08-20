import { request } from '@gilbarbara/helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchJwt } from 'modules/auth';
import { UserActionTypes } from 'literals';

export function* getUser() {
  try {
    const user = yield call(request, `http://localhost:3000/me`, {
      headers: {
        Authorization: `Bearer ${fetchJwt()}`,
      },
    });
    console.log('User ', user);

    yield put({
      type: UserActionTypes.USER_GET_SUCCESS,
      payload: user,
    });
  } catch (err) {
    console.log('Error ', err);
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
  yield all([takeLatest(UserActionTypes.USER_GET_REQUEST, getUser)]);
}
