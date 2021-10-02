import { all, call, put, takeLatest } from 'redux-saga/effects';
import { PullsActionTypes, UserActionTypes } from 'literals';
import api, { IApi } from 'modules/requests';

export function* getRelatedPulls({ get }: IApi): Generator {
  try {
    const pulls: any = yield call(get, '/pulls');

    yield put({
      type: PullsActionTypes.PULLS_GET_ALL_SUCCESS,
      payload: pulls.data,
    });
    yield put({
      type: UserActionTypes.USER_RATE_LIMIT_SUCCESS,
      payload: pulls.data.rateLimit,
    });
  } catch (err) {
    yield put({
      type: PullsActionTypes.PULLS_GET_ALL_FAILURE,
      payload: err,
    });
  }
}

/**
 * Settings Sagas
 */
export default function* root() {
  yield all([takeLatest(PullsActionTypes.PULLS_GET_ALL_REQUEST, getRelatedPulls, api)]);
}
