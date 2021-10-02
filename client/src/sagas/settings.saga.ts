import { all, call, put, takeLatest } from 'redux-saga/effects';
import { SettingsActionTypes, UserActionTypes } from 'literals';
import { IStoreAction } from 'types';
import { UserActions, SettingsActions } from 'actions';
import api, { IApi } from 'modules/requests';

export function* getRepos(
  { get }: IApi,
  { payload }: IStoreAction<SettingsActions.IGetReposRequest>,
): Generator {
  try {
    const repos: any = yield call(get, '/repos', {
      params: {
        _a: payload?.after,
        _b: payload?.before,
      },
    });

    yield put({
      type: SettingsActionTypes.SETTINGS_GET_REPOS_SUCCESS,
      payload: repos.data,
    });
    yield put({
      type: UserActionTypes.USER_RATE_LIMIT_SUCCESS,
      payload: repos.data.rateLimit,
    });
  } catch (err) {
    yield put({
      type: SettingsActionTypes.SETTINGS_GET_REPOS_FAILURE,
      payload: err,
    });
  }
}

export function* saveUserRepos({ post }: IApi, { payload }: IStoreAction): Generator {
  try {
    const { repos } = payload;
    const body = {
      repos,
    };
    console.log(body);
    yield call(post, '/repos', body);

    yield put({
      type: SettingsActionTypes.SETTINGS_SAVE_USER_REPOS_SUCCESS,
    });

    yield put(UserActions.getUser());
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
    takeLatest(SettingsActionTypes.SETTINGS_GET_REPOS_REQUEST, getRepos, api),
    takeLatest(SettingsActionTypes.SETTINGS_SAVE_USER_REPOS_REQUEST, saveUserRepos, api),
  ]);
}
