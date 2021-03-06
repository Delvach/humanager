import { call, all, takeEvery } from 'redux-saga/effects';

import { humansSagas } from './humans';
import { navigationSagas } from './navigation';
import { rolesSagas } from './roles';
import { preferenceSagas } from './preferences';
import { visualizationSagas } from './visualizations';

import { apiErrorHandler } from '../utils/core';

// Default API error handler
function* handleAPIError({ payload }) {
  yield call(apiErrorHandler(payload.error));
}

// Watch for default API error handler
function* watchAPIErrors() {
  yield takeEvery('API_ERROR', handleAPIError);
}

// Define module-independent sagas
export const coreSagas = [watchAPIErrors()];

// Combine sagas from all modules
export default function* rootSaga() {
  yield all([
    ...coreSagas,
    ...humansSagas,
    ...navigationSagas,
    ...rolesSagas,
    ...preferenceSagas,
    ...visualizationSagas
  ]);
}
