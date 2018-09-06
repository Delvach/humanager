import { put, select, takeEvery } from 'redux-saga/effects';

import { apiError } from '../actions';
import {
  setDialogModeAction,
  setDialogDatatypeAction,
  setCreateEditDialogEditIdAction,
  setCreateEditDialogOpenStatusAction,
  setCreateEditDialogInitDataAction,
  resetCreateEditDialogInitDataAction,
  closeDialogAction
} from '../actions/navigation';

import { createHuman, updateHuman, loadAllHumansData } from './humans';

import { uiErrorHandler } from '../utils/core';

import * as ACTIONS from '../constants/actions';

import { DIALOG_MODE_EDIT } from '../constants/humans';

/* Handle dialog status
 * human/role create/edit open/close & related behaviors
 */
function* setDialogStatus({ payload }) {
  const { id, mode, open, moduleId } = payload;

  // Creating new or editing current?
  const editing = mode === DIALOG_MODE_EDIT;

  // Set flag indicating data type
  yield put(setDialogDatatypeAction(moduleId));

  // Set flag indicating modal mode
  yield put(setDialogModeAction(mode));

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

function* handleDialogSubmit() {
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
    yield put(closeDialogAction());

    // Refresh master human list
    yield* loadAllHumansData();
  } catch (error) {
    yield put(apiError(error));
  }
}

function* watchDialogStatus() {
  yield takeEvery(ACTIONS.SET_DIALOG_STATUS, setDialogStatus);
}

function* watchDialogSubmission() {
  yield takeEvery(ACTIONS.SUBMIT_DIALOG, handleDialogSubmit);
}

export const navigationSagas = [watchDialogStatus(), watchDialogSubmission()];
