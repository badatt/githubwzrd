import { request } from '@gilbarbara/helpers';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { fetchJwt } from 'modules/auth';
import { SettingsActionTypes } from 'literals';
import { StoreAction } from 'types';
import { getUser } from 'actions/user.action';

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

export function* saveUserRepos({ payload }: StoreAction): Generator {
  try {
    const { repos } = payload;
    const body = {
      repos,
    };
    yield call(request, `${process.env.API_URL}/repos`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${fetchJwt()}`,
      },
      body,
    });

    yield put({
      type: SettingsActionTypes.SETTINGS_SAVE_USER_REPOS_SUCCESS,
    });

    yield put(getUser());
  } catch (err) {
    yield put({
      type: SettingsActionTypes.SETTINGS_SAVE_USER_REPOS_FAILURE,
      payload: err,
    });
  }
}

/**
 * Settings Sagas
 */
export default function* root() {
  yield all([
    takeLatest(SettingsActionTypes.SETTINGS_GET_REPOS_REQUEST, getRepos),
    takeLatest(SettingsActionTypes.SETTINGS_SAVE_USER_REPOS_REQUEST, saveUserRepos),
  ]);
}
