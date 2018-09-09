import { put, select, takeEvery } from 'redux-saga/effects';

import { apiError } from '../actions';
import {
  setDialogModeAction,
  setDialogDatatypeAction,
  setDialogEditIdAction,
  setCreateEditDialogOpenStatusAction,
  setHumanEditingDialogAction,
  setRoleEditingDialogAction,
  resetCreateEditDialogInitDataAction,
  closeDialogAction
} from '../actions/navigation';

import { createHuman, updateHuman, loadAllHumansData } from './humans';
import { createRole, updateRole, loadAllRolesData } from './roles';

import { loadUserPreferenceData } from './preferences';

import { uiErrorHandler } from '../utils/core';

import * as ACTIONS from '../constants/actions';

import { DIALOG_MODE_EDIT } from '../constants/humans';

function* initializeAppData() {
  try {
    yield* loadUserPreferenceData();

    // Load master humans list
    yield* loadAllHumansData();

    // Load master roles list
    yield* loadAllRolesData();
  } catch (error) {
    yield put(apiError(error));
  }
}

function* initializeHumanEditingDialog(id = null) {
  // Pull all humans from state
  const humans = yield select(state => state.humans);

  // Identify specified human by id
  const human = humans.find(hum => hum.id === id);

  // Set data used by initialValues during form render
  yield put(setHumanEditingDialogAction(human));
}

function* initializeRoleEditingDialog(id = null) {
  // Pull all roles from state
  const roles = yield select(state => state.roles);

  // Identify specified role by id
  const role = roles.find(rol => rol.id === id);

  // Set data used by initialValues during form render
  yield put(setRoleEditingDialogAction(role));
}

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
  yield put(setDialogEditIdAction(open && editing ? id : null, moduleId));

  if (open && editing) {
    try {
      if (moduleId === 'humans') {
        yield* initializeHumanEditingDialog(id);
      } else {
        yield* initializeRoleEditingDialog(id);
      }
    } catch (error) {
      uiErrorHandler(`ERROR: Unable to load user ${id}`);
    }
  }

  // Set flag used for modal open/close status
  yield put(setCreateEditDialogOpenStatusAction(open));

  // When closing, reset human data used for initialValues
  if (!open) yield put(resetCreateEditDialogInitDataAction());
}

function* handleHumanDialogSubmit() {
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

function* handleRoleDialogSubmit() {
  try {
    const state = yield select(state => state);

    const { name, members } = state.form.roleForm.values;
    const id = state.navigation.roleModalEditId;

    const memberIds = members.map(human => human.value);

    const payload = { name, members: memberIds };

    if (id === null) {
      yield* createRole({ name, members: memberIds });
    } else {
      payload.id = id;

      yield* updateRole({ payload });
    }

    // Close human modal
    yield put(closeDialogAction());

    // Refresh master human list
    yield* loadAllRolesData();
  } catch (error) {
    yield put(apiError(error));
  }
}

/*
 *  Define saga watchers
 */
function* initializeHumanagerApp() {
  yield takeEvery(ACTIONS.INITIALIZE_APP, initializeAppData);
}

function* watchDialogStatus() {
  yield takeEvery(ACTIONS.SET_DIALOG_STATUS, setDialogStatus);
}

function* watchHumanDialogSubmission() {
  yield takeEvery(ACTIONS.SUBMIT_HUMAN_DIALOG, handleHumanDialogSubmit);
}

function* watchRoleDialogSubmission() {
  yield takeEvery(ACTIONS.SUBMIT_ROLE_DIALOG, handleRoleDialogSubmit);
}

export const navigationSagas = [
  initializeHumanagerApp(),
  watchDialogStatus(),
  watchHumanDialogSubmission(),
  watchRoleDialogSubmission()
];
