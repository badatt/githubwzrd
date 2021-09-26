import { all, fork } from 'redux-saga/effects';

import pulls from './pulls.saga';
import settings from './settings.saga';
import user from './user.saga';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(pulls), fork(settings), fork(user)]);
}
