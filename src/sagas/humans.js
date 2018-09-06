import { call, put, select, takeEvery } from 'redux-saga/effects';

import api from '../api';

import { apiError } from '../actions';
import {
  setCreateEditDialogModeAction,
  setCreateEditDialogEditIdAction,
  setCreateEditDialogOpenStatusAction,
  setCreateEditDialogInitDataAction,
  resetCreateEditDialogInitDataAction
} from '../actions/navigation';

import {
  humanCreatedAction,
  humanDeletedAction,
  humansLoadedAction,
  humanLoadedAction,
  humanUpdatedAction
} from '../actions/humans';

import { uiErrorHandler } from '../utils/core';

import { closeEditingDialogAction } from '../actions/navigation';

import * as ACTIONS from '../constants/actions';
import * as DATABASE_NAMES from '../constants/api';
import { HUMAN_MODAL_MODE_EDIT } from '../constants/humans';

import { normalizeAllHumansData } from '../utils/humans';

/*
 *  Define saga tasks
 */

/*
 *  Load humans from api and normalize data
 */
function* loadAllHumansData() {
  try {
    // Read master humans list from API
    const allHumans = yield call(api.database.read, DATABASE_NAMES.HUMANS);

    // Update state with master humans list data
    yield put(humansLoadedAction(normalizeAllHumansData(allHumans)));
  } catch (error) {
    yield put(apiError(error));
  }
}

/*
 *  Load single human from api and normalize data
 */
function* loadHumanData({ payload }) {
  try {
    // Read single human from API
    const human = yield call(
      api.database.read,
      `${DATABASE_NAMES.HUMANS}/${payload.id}`
    );

    // Update state with human data
    yield put(humanLoadedAction(human));
  } catch (error) {
    yield put(apiError(error));
  }
}

// Handle human create/edit open/close & related behaviors
function* setHumanModalStatus({ payload }) {
  const { id, mode, open } = payload;
  const editing = mode === HUMAN_MODAL_MODE_EDIT;

  // Set flag indicating modal mode
  yield put(setCreateEditDialogModeAction(mode));

  // If editing, use ID to populate  data
  yield put(setCreateEditDialogEditIdAction(open && editing ? id : null));

  if (open && editing) {
    try {
      // Pull all humans from state
      const humans = yield select(state => state.humans);

      // Identify specified user by id
      const human = humans.find(hum => hum.id === id);

      // Set data used by initialValues during form render
      yield put(setCreateEditDialogInitDataAction(human));
    } catch (error) {
      uiErrorHandler(`ERROR: Unable to load user ${id}`);
    }
  }

  // Set flag used for modal open/close status
  yield put(setCreateEditDialogOpenStatusAction(open));

  // When closing, reset human data used for initialValues
  if (!open) yield put(resetCreateEditDialogInitDataAction());
}

function* handleHumanModalSubmit() {
  try {
    const state = yield select(state => state);

    const { name, email, age } = state.form.humanForm.values;
    const id = state.navigation.humanModalEditId;

    if (id === null) {
      yield* createHuman({ name, email, age });
    } else {
      yield* updateHuman({ name, email, age, id });
    }

    // Close human modal
    yield put(closeEditingDialogAction());

    // Refresh master human list
    yield* loadAllHumansData();
  } catch (error) {
    yield put(apiError(error));
  }
}

/*
 *  Save new human to api
 */
function* createHuman(data) {
  try {
    // Submit new human to API
    const newHumanID = yield call(
      api.database.create,
      DATABASE_NAMES.HUMANS,
      data
    );

    // Dispatch human creation success notification
    yield put(humanCreatedAction(newHumanID));
  } catch (error) {
    yield put(apiError(error));
  }
}

/*
 *  Update existing human in api
 */
function* updateHuman(data) {
  try {
    const { name, email, age } = data;

    // Submit updated human to API
    yield call(api.database.patch, `${DATABASE_NAMES.HUMANS}/${data.id}`, {
      name,
      email,
      age
    });

    // Dispatch human update success notification
    yield put(humanUpdatedAction(data.id));
  } catch (error) {
    yield put(apiError(error));
  }
}

/*
 *  Delete existing human from api
 */
function* deleteHuman({ payload }) {
  try {
    yield call(api.database.delete, `${DATABASE_NAMES.HUMANS}/${payload.id}`);
    yield put(humanDeletedAction(payload.id));

    // Refresh master human list
    yield* loadAllHumansData();
  } catch (error) {
    yield put(apiError(error));
  }
}

/*
 *  Define saga watchers
 */
function* initializeHumanagerApp() {
  yield takeEvery(ACTIONS.INITIALIZE_APP, loadAllHumansData);
}

function* watchHumanModalSubmission() {
  yield takeEvery(ACTIONS.SUBMIT_CREATE_EDIT_DIALOG, handleHumanModalSubmit);
}

function* watchHumanModalStatus() {
  yield takeEvery(ACTIONS.SET_HUMAN_MODAL_STATUS, setHumanModalStatus);
}

function* watchAllHumansLoad() {
  yield takeEvery(ACTIONS.LOAD_HUMANS, loadAllHumansData);
}

function* watchHumanLoad() {
  yield takeEvery(ACTIONS.LOAD_HUMAN, loadHumanData);
}

function* watchHumanDelete() {
  yield takeEvery(ACTIONS.DELETE_HUMAN, deleteHuman);
}

export const humansSagas = [
  initializeHumanagerApp(),
  watchHumanModalSubmission(),
  watchHumanModalStatus(),
  watchAllHumansLoad(),
  watchHumanLoad(),
  watchHumanDelete()
];
