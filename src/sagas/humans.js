import { call, put, select, takeEvery } from 'redux-saga/effects';

import api from '../api';

import { apiError } from '../actions';
import {
  humanCreatedAction,
  humanDeletedAction,
  humansLoadedAction,
  humanLoadedAction,
  humanUpdatedAction
} from '../actions/humans';

import { setHumanAttribute } from '../actions/human';

import { closeEditHumanModalAction } from '../actions/navigation';

import * as ACTIONS from '../constants/actions';
import * as DATABASE_TABLES from '../constants/api';
import { HUMAN_NAME } from '../constants/humans';

import {
  normalizeAllHumansData,
  normalizeHumanData,
  normalizeCreateHumanData
} from '../utils/humans';

/*
 *  Define saga tasks
 */

/*
 *  Load humans from api andnormalize data
 */
function* loadHumansData() {
  try {
    // Read master humans list from API
    const allHumans = yield call(api.database.read, DATABASE_TABLES.HUMANS);

    // Update state with master humans list data
    yield put(humansLoadedAction(normalizeAllHumansData(allHumans)));
  } catch (error) {
    yield put(apiError(error));
  }
}

/*
 *  Load single human from api andnormalize data
 */
function* loadHumanData({ payload }) {
  try {
    // Read single human from API
    const human = yield call(
      api.database.read,
      `${DATABASE_TABLES.HUMANS}/${payload.id}`
    );

    // Update state with human data
    yield put(humanLoadedAction(normalizeHumanData(human)));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* handleHumanSubmit(payload) {
  const isNew = yield select(state => state.human.isNew);
  if (isNew) {
    yield* call(createHuman());
  } else {
    yield* call(updateHuman(payload));
  }
}

/*
 *  Save new human to api
 */
function* createHuman() {
  try {
    // Pull human data from state
    const data = yield select(state => state.human);

    // Submit new human to API
    const newHumanID = yield call(
      api.database.create,
      DATABASE_TABLES.HUMANS,
      normalizeCreateHumanData(data)
    );

    // Dispatch human creation success notification
    yield put(humanCreatedAction(newHumanID));

    // Ensure human modal is closed
    yield put(closeEditHumanModalAction());

    // Refresh master human list
    yield* loadHumansData();
  } catch (error) {
    yield put(apiError(error));
  }
}

/*
 *  Update existing human in api
 */
function* updateHuman({ payload }) {
  try {
    // Pull human data from state
    const data = yield select(state => state.human);

    // Submit updated human to API
    yield call(
      api.database.patch,
      `${DATABASE_TABLES.HUMANS}/${payload.id}`,
      normalizeCreateHumanData(data)
    );

    // Dispatch human update success notification
    yield put(humanUpdatedAction(payload.id));

    // Refresh master human list
    yield* loadHumansData();
  } catch (error) {
    yield put(apiError(error));
  }
}

/*
 *  Delete existing human from api
 */
function* deleteHuman({ payload }) {
  try {
    yield call(api.database.delete, `${DATABASE_TABLES.HUMANS}/${payload.id}`);
    yield put(humanDeletedAction(payload.id));

    // Refresh master human list
    yield* loadHumansData();
  } catch (error) {
    yield put(apiError(error));
  }
}

/*
 * Set modal for new human
 */
function* openHumanCreateModal() {
  try {
    // Set empty data for new human
    yield put(setHumanAttribute(HUMAN_NAME, ''));

    // Open modal
    yield put({
      type: ACTIONS.CHANGE_HUMAN_MODAL_STATUS,
      payload: {
        open: true
      }
    });
  } catch (error) {
    yield put(apiError(error));
  }
}

/*
 * Set modal for existing human
 */
function* openHumanEditModal({ payload }) {
  try {
    // Import existing user data from API to ensure up-to-date
    yield* loadHumanData({ payload });

    // Pull updated data from state
    const human = yield select(({ human }) => ({ human }));

    // Inject existing user data into modal fields
    yield put(setHumanAttribute(HUMAN_NAME, human[HUMAN_NAME]));

    // Open modal
    yield put({
      type: ACTIONS.CHANGE_HUMAN_MODAL_STATUS,
      payload: {
        open: true
      }
    });
  } catch (error) {
    yield put(apiError(error));
  }
}

/*
 *  Define saga watchers
 */
function* initializeHumanagerApp() {
  yield takeEvery(ACTIONS.INITIALIZE_APP, loadHumansData);
}

function* watchHumansLoad() {
  yield takeEvery(ACTIONS.LOAD_HUMANS, loadHumansData);
}

function* watchHumanLoad() {
  yield takeEvery(ACTIONS.LOAD_HUMAN, loadHumanData);
}

function* watchHumanCreation() {
  // yield takeEvery(ACTIONS.CREATE_HUMAN, createHuman);
  yield takeEvery(ACTIONS.SUBMIT_HUMAN_MODAL, handleHumanSubmit);
}

function* watchHumanUpdate() {
  yield takeEvery(ACTIONS.UPDATE_HUMAN, updateHuman);
}

function* watchHumanDelete() {
  yield takeEvery(ACTIONS.DELETE_HUMAN, deleteHuman);
}

function* watchHumanCreateModalOpen() {
  yield takeEvery(ACTIONS.OPEN_CREATE_HUMAN_MODAL, openHumanCreateModal);
}

function* watchHumanEditModalOpen() {
  yield takeEvery(ACTIONS.OPEN_EDIT_HUMAN_MODAL, openHumanEditModal);
}

export const humansSagas = [
  initializeHumanagerApp(),
  watchHumansLoad(),
  watchHumanLoad(),
  watchHumanCreation(),
  watchHumanUpdate(),
  watchHumanDelete(),
  watchHumanCreateModalOpen(),
  watchHumanEditModalOpen()
];
