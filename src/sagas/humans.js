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

// import { setHumanName } from '../actions/human';

import { toggleHumanModalStatusAction } from '../actions/navigation';

import * as ACTIONS from '../constants/actions';
import * as DATABASE_TABLES from '../constants/api';

import { normalizeAllHumansData } from '../utils/humans';

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
    yield put(humanLoadedAction(human));
  } catch (error) {
    yield put(apiError(error));
  }
}

function* handleHumanModalSubmit() {
  try {
    const state = yield select(state => state);

    const { username, email, age } = state.form.humanForm.values;
    const id = state.navigation.humanModalEditId;
    console.log(id);
    if (id === null) {
      yield* createHuman({ username, email, age });
    } else {
      yield* updateHuman({ username, email, age, id });
    }

    // Close human modal
    yield put(toggleHumanModalStatusAction(false));

    // Refresh master human list
    yield* loadHumansData();
  } catch (error) {
    yield put(apiError(error));
  }
}

/*
 *  Save new human to api
 */
function* createHuman(data) {
  try {
    // Pull human data from state
    // const data = yield select(state => state.human);

    // Submit new human to API
    const newHumanID = yield call(
      api.database.create,
      DATABASE_TABLES.HUMANS,
      data
    );

    // Dispatch human creation success notification
    yield put(humanCreatedAction(newHumanID));

    // // Refresh master human list
    // yield* loadHumansData();
  } catch (error) {
    yield put(apiError(error));
  }
}

/*
 *  Update existing human in api
 */
function* updateHuman(data) {
  try {
    // Pull human data from state
    // const data = yield select(state => state.human);
    const { username, email, age } = data;

    // Submit updated human to API
    yield call(api.database.patch, `${DATABASE_TABLES.HUMANS}/${data.id}`, {
      username,
      email,
      age
    });

    // Dispatch human update success notification
    yield put(humanUpdatedAction(data.id));

    // // Refresh master human list
    // yield* loadHumansData();
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

function* watchHumanModal() {
  // yield takeEvery(ACTIONS.CREATE_HUMAN, createHuman);
  yield takeEvery(ACTIONS.SUBMIT_HUMAN_MODAL, handleHumanModalSubmit);
}

function* watchHumanUpdate() {
  yield takeEvery(ACTIONS.UPDATE_HUMAN, updateHuman);
}

function* watchHumanDelete() {
  yield takeEvery(ACTIONS.DELETE_HUMAN, deleteHuman);
}

// function* watchHumanCreateModalOpen() {
//   yield takeEvery(ACTIONS.OPEN_CREATE_HUMAN_MODAL, openHumanCreateModal);
// }

// function* watchHumanEditModalOpen() {
//   yield takeEvery(ACTIONS.OPEN_EDIT_HUMAN_MODAL, openHumanEditModal);
// }

export const humansSagas = [
  initializeHumanagerApp(),
  watchHumansLoad(),
  watchHumanLoad(),
  watchHumanModal(),
  watchHumanUpdate(),
  watchHumanDelete()
];
