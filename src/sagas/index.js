import { call, all, takeEvery } from 'redux-saga/effects';

import { humansSagas } from './humans';
import { navigationSagas } from './navigation';
import { rolesSagas } from './roles';

// Default API error handler
function* handleAPIError({ payload }) {
  yield call(console.log(payload.error));
}

// Watch for default API error handler
function* watchAPIErrors() {
  yield takeEvery('API_ERROR', handleAPIError);
}

// Define module-independent sagas
export const coreSagas = [watchAPIErrors()];

// Combine sagas from all modules
export default function* rootSaga() {
  yield all([...coreSagas, ...humansSagas, ...navigationSagas, ...rolesSagas]);
}
