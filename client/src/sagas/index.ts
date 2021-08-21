import { all, fork } from 'redux-saga/effects';

import user from './user.saga';
import settings from './settings.saga';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(user), fork(settings)]);
}
