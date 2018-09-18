import { delay } from 'redux-saga';
import {
  put,
  select,
  takeEvery,
  call,
  take,
  cancel,
  fork
} from 'redux-saga/effects';

import { apiError } from '../actions';
import { storeTopPaneHeightPreferenceAction } from '../actions/preferences';
import {
  setDialogModeAction,
  setDialogDatatypeAction,
  setDialogEditIdAction,
  setCreateEditDialogOpenStatusAction,
  setHumanEditingDialogAction,
  setRoleEditingDialogAction,
  resetHumanEditingDialogInitDataAction,
  resetRoleEditingDialogInitDataAction,
  closeDialogAction,
  toggleVisualizationResizeFlagAction,
  triggerVisualizationResizeAction,
  completeVisualizationResizeAction
} from '../actions/navigation';

import { randomizeItemsPositionsAction } from '../actions/visualizations';

import { createHuman, updateHuman, loadAllHumansData } from './humans';
import { createRole, updateRole, loadAllRolesData } from './roles';

import {
  loadUserPreferenceData,
  setNavigationFromLoadedPreferenceData
} from './preferences';

import { uiErrorHandler } from '../utils/core';
import { normalizeRoleData } from '../utils/roles';

import * as ACTIONS from '../constants/actions';

import { DIALOG_MODE_EDIT } from '../constants/humans';

function* initializeAppData() {
  try {
    yield* loadUserPreferenceData();
    yield* setNavigationFromLoadedPreferenceData();

    // Load master humans list
    yield* loadAllHumansData();

    // Load master roles list
    yield* loadAllRolesData();

    yield put(randomizeItemsPositionsAction());
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
  if (!open) {
    if (moduleId === 'humans') {
      yield put(resetHumanEditingDialogInitDataAction());
    } else {
      yield put(resetRoleEditingDialogInitDataAction());
    }
  }
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

    const payload = normalizeRoleData(name, members);

    if (id === null) {
      yield* createRole({ payload });
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

function* handleTopPaneResize(size) {
  yield call(delay, 300);
  yield put(storeTopPaneHeightPreferenceAction(size));
}

function* handleContentPanelsResize(size) {
  yield* handleTopPaneResize(size);
  // yield put(toggleVisualizationResizeAction(true));
  yield put(toggleVisualizationResizeFlagAction(true));
  // yield put(completeVisualizationResizeAction());
}

function* handleResize() {
  // Debounce resize; prevents excessive events and
  // allows for drawer transition delay
  yield call(delay, 500);

  // Set flag to update component, will cause
  // re-calculation of container size
  yield put(toggleVisualizationResizeFlagAction(true));

  // yield put(completeVisualizationResizeAction());
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

// Debounce resizing
function* watchTopPaneResize() {
  // Placeholder for task ref
  let task;

  // Loopy loop loop
  while (true) {
    // Blocking, receive trigger action and retrieve value(s)
    const { payload } = yield take(ACTIONS.HANDLE_TOP_PANE_RESIZE);

    // Cancel any existing task associated with this reference
    if (task) {
      yield cancel(task);
    }
    // Async, trigger final task on a delay that will be cancelled
    //if take() is triggered by loop before delay completes
    task = yield fork(handleContentPanelsResize, payload.size);
  }
}

// The 'onchange' event that triggers drawer toggle needs a small delay before
// triggering a re-calculation of visualization size
function* watchResizeEvents() {
  let task;

  while (true) {
    yield take(ACTIONS.TRIGGER_VISUALIZATION_RESIZE);
    if (task) {
      yield cancel(task);
    }
    task = yield fork(handleResize);
  }

  // toggleVisualizationResizeAction
  //completeVisualizationResizeAction
}

export const navigationSagas = [
  initializeHumanagerApp(),
  watchDialogStatus(),
  watchHumanDialogSubmission(),
  watchRoleDialogSubmission(),
  watchTopPaneResize(),
  watchResizeEvents()
];
