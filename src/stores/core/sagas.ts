import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
  select,
  race,
  take
} from 'redux-saga/effects';

import { CoreActionTypes, CoreActions } from './';
import { watch } from 'chokidar';

interface ActionPayload {
  payload?: any;
  type: string;
}

function* handleLogin() {
  try {
    yield () => {};
  } catch (err) {
    throw new Error(err);
  }
}

function* handleLogout() {
  try {
    yield () => {};
  } catch (err) {
    throw new Error(err);
  }
}

function* watchLogin() {
  yield takeEvery(CoreActionTypes.LOGIN, handleLogin);
}

function* watchLogout() {
  yield takeEvery(CoreActionTypes.LOGOUT, handleLogin);
}

export function* saga() {
  yield all([fork(watchLogin), fork(watchLogout)]);
}
