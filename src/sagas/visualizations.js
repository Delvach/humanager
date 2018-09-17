import { put, takeEvery } from 'redux-saga/effects';

import * as ACTIONS from '../constants/actions';

import { testOutputAction } from '../actions/visualizations';

function* handleTestAction() {
  yield put(testOutputAction());
}

function* watchTestAction() {
  yield takeEvery(ACTIONS.TEST, handleTestAction);
}

export const visualizationSagas = [watchTestAction()];
