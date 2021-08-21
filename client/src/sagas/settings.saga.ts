import { request } from '@gilbarbara/helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchJwt } from 'modules/auth';
import { SettingsActionTypes } from 'literals';

export function* getRepos(): Generator {
  try {
    const repos = yield call(request, `${process.env.API_URL}/repos`, {
      headers: {
        Authorization: `Bearer ${fetchJwt()}`,
      },
    });

    yield put({
      type: SettingsActionTypes.SETTINGS_GET_REPOS_SUCCESS,
      payload: repos,
    });
  } catch (err) {
    yield put({
      type: SettingsActionTypes.SETTINGS_GET_REPOS_FAILURE,
      payload: err,
    });
  }
}

/**
 * Settings Sagas
 */
export default function* root() {
  yield all([takeLatest(SettingsActionTypes.SETTINGS_GET_REPOS_REQUEST, getRepos)]);
}
