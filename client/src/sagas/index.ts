import { all, fork } from 'redux-saga/effects';

import github from './github';
import user from './user.saga';

/**
 * rootSaga
 */
export default function* root() {
  yield all([fork(github), fork(user)]);
}
