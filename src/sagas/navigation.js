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
  changeTabAction,
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
  setSelectedListItems,
  resetSelectedListItems,
  setSortFilterAction
  // triggerVisualizationResizeAction,
  // completeVisualizationResizeAction
} from '../actions/navigation';

import { deleteHumansAction } from '../actions/humans';
import { deleteRolesAction } from '../actions/roles';
import { setUserIDAction } from '../actions/user';

import { randomizeItemsPositionsAction } from '../actions/visualizations';

import {
  createHuman,
  updateHuman,
  deleteHumans,
  loadAllHumansData
} from './humans';
import { createRole, updateRole, deleteRoles, loadAllRolesData } from './roles';

import {
  loadUserPreferenceData,
  setNavigationFromLoadedPreferenceData
} from './preferences';

import { uiErrorHandler } from '../utils/core';
import { normalizeRoleData } from '../utils/roles';

import * as ACTIONS from '../constants/actions';
import {
  TABLE_SORT_ASCENDING,
  TABLE_SORT_DESCENDING
} from '../constants/navigation';
import { ROLE_ATTRIBUTES, DEFAULT_ROLE_ATTRIBUTE } from '../constants/roles';
import {
  DIALOG_MODE_EDIT,
  HUMAN_ATTRIBUTES,
  DEFAULT_HUMAN_ATTRIBUTE
} from '../constants/humans';

import rsf, { provider } from '../api';

function* initializeAppData() {
  try {
    // Use anonymous authentication to get a persistent user token
    // (Will integrate optional account integration/creation later)
    const { user } = yield call(rsf.auth.signInAnonymously, provider);
    yield put(setUserIDAction(user.uid));

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

function* handleTabNavigation({ payload }) {
  const { tab } = payload;
  const sortBy = yield select(state => state.navigation.sortBy);

  yield put(resetSelectedListItems());

  // Ensure that current sort exists for current tab
  const currFields = tab !== 1 ? HUMAN_ATTRIBUTES : ROLE_ATTRIBUTES;
  if (currFields.find(field => field.value === sortBy) === undefined) {
    yield put(
      setSortFilterAction(
        tab !== 1 ? DEFAULT_HUMAN_ATTRIBUTE : DEFAULT_ROLE_ATTRIBUTE,
        TABLE_SORT_ASCENDING
      )
    );
  }

  yield put(changeTabAction(tab));
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

    const {
      nameFirst,
      nameLast,
      title,
      email,
      age
    } = state.form.humanForm.values;
    const id = state.navigation.humanModalEditId;

    if (id === null) {
      yield* createHuman({ nameFirst, nameLast, title, email, age });
    } else {
      yield* updateHuman({ nameFirst, nameLast, title, email, age, id });
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

// User has clicked a list row
function* handleListSelectionChange({ payload }) {
  const { id } = payload;
  const selectedItems = yield select(
    state => state.navigation.listItemsSelected
  );

  const selectedIndex = selectedItems.indexOf(id);
  let newSelectedItems = [];

  if (selectedIndex === -1) {
    newSelectedItems = newSelectedItems.concat(selectedItems, id);
  } else if (selectedIndex === 0) {
    newSelectedItems = newSelectedItems.concat(selectedItems.slice(1));
  } else if (selectedIndex === selectedItems.length - 1) {
    newSelectedItems = newSelectedItems.concat(selectedItems.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelectedItems = newSelectedItems.concat(
      selectedItems.slice(0, selectedIndex),
      selectedItems.slice(selectedIndex + 1)
    );
  }

  yield put(setSelectedListItems(newSelectedItems));
}

function* handleSelectAllListItems({ payload }) {
  const { checked } = payload;
  const state = yield select(state => state);

  const { tab } = state.navigation;
  const items = tab !== 1 ? state.humans : state.roles;

  if (!checked) {
    yield put(resetSelectedListItems());
  } else {
    yield put(setSelectedListItems(items.map(i => i.id)));
  }
}

function* handleListReset() {
  yield put(setSelectedListItems([]));
}

function* handleSelectedItemDeletion() {
  const navigation = yield select(state => state.navigation);
  const { listItemsSelected } = navigation;
  if (navigation.tab === 0) {
    // Trigger batch delete in humans saga
    yield* deleteHumans(deleteHumansAction(listItemsSelected));
  } else if (navigation.tab === 1) {
    // Trigger batch delete in roles saga
    yield* deleteRoles(deleteRolesAction(listItemsSelected));
  }
}

function* handleChangeListSort({ payload }) {
  const { property } = payload;
  const navigation = yield select(state => state.navigation);
  let sortByDirection = TABLE_SORT_DESCENDING;
  if (
    navigation.sortBy === property &&
    navigation.sortByDirection === TABLE_SORT_DESCENDING
  ) {
    sortByDirection = TABLE_SORT_ASCENDING;
  }
  yield put(setSortFilterAction(property, sortByDirection));
}

export function* removeIdsFromSelectedList(ids) {
  const listItemsSelected = yield select(
    state => state.navigation.listItemsSelected
  );

  const newItemsSelected = [];
  for (let i = 0; i < listItemsSelected.length; i++) {
    if (ids.indexOf(listItemsSelected[i]) === -1) {
      newItemsSelected.push(listItemsSelected[i]);
    }
  }

  yield put(setSelectedListItems(newItemsSelected));
}

/*
 *  Define saga watchers
 */
function* initializeHumanagerApp() {
  yield takeEvery(ACTIONS.INITIALIZE_APP, initializeAppData);
}

function* watchTabNavigation() {
  yield takeEvery(ACTIONS.TRIGGER_TAB_CHANGE, handleTabNavigation);
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

function* watchListSelectionEvents() {
  yield takeEvery(
    ACTIONS.TOGGLE_LIST_ITEM_SELECTION,
    handleListSelectionChange
  );
}

function* watchListSelectAllEvents() {
  yield takeEvery(ACTIONS.LIST_SELECT_ALL, handleSelectAllListItems);
}

function* watchListReset() {
  yield takeEvery(ACTIONS.RESET_SELECTED_LIST_ITEMS, handleListReset);
}

function* watchDeletedSelecteListItems() {
  yield takeEvery(
    ACTIONS.DELETE_SELECTED_LIST_ITEMS,
    handleSelectedItemDeletion
  );
}

function* watchChangeListSort() {
  yield takeEvery(ACTIONS.CHANGE_LIST_SORT, handleChangeListSort);
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
  watchTabNavigation(),
  watchDialogStatus(),
  watchHumanDialogSubmission(),
  watchRoleDialogSubmission(),
  watchTopPaneResize(),
  watchResizeEvents(),
  watchListSelectAllEvents(),
  watchListSelectionEvents(),
  watchDeletedSelecteListItems(),
  watchListReset(),
  watchChangeListSort()
];
