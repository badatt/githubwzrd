import { request } from '@gilbarbara/helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchJwt } from 'modules/auth';
import { UserActionTypes } from 'literals';

export function* getUser(): Generator {
  try {
    const user = yield call(request, `${process.env.API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${fetchJwt()}`,
      },
    });

    yield put({
      type: UserActionTypes.USER_GET_SUCCESS,
      payload: user,
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
  yield all([takeLatest(UserActionTypes.USER_GET_REQUEST, getUser)]);
}
