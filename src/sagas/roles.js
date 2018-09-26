import { call, put, takeEvery, select } from 'redux-saga/effects';

import api from '../api';

import { apiError, sagaError } from '../actions';

import {
  deleteRoleAction,
  roleCreatedAction,
  roleDeletedAction,
  rolesLoadedAction,
  roleLoadedAction,
  roleUpdatedAction
} from '../actions/roles';

import {
  resetItemAction,
  updateVisualizationItemPositionsAction,
  deleteVisualizationItemPositionAction
} from '../actions/visualizations';

import * as ACTIONS from '../constants/actions';
import * as DATABASE_NAMES from '../constants/api';

import { removeItemFromList } from '../utils/data';
import { getRandomPosition } from '../utils/visualizations';
import { setSelectedListItems } from '../actions/navigation';

import { pickRandomColor } from '../utils/humans';

import {
  normalizeAllRolesData,
  getFauxRolesData,
  normalizeRoleData
} from '../utils/roles';

import { removeIdsFromSelectedList } from './navigation';

/*
 *  Define saga tasks
 */

/*
 *  Load roles from api and normalize data
 */
export function* loadAllRolesData() {
  try {
    const { uid } = yield select(state => state.user);

    // Get current positions data
    const { visualizations } = yield select(state => state);
    const itemsPositions = Object.assign({}, visualizations.itemsPositions);

    // Read master roles list from API
    const allRoles = yield call(api.database.read, DATABASE_NAMES.ROLES);
    const myRoles = {};

    // World's least secure and least efficient means of individual retrievals
    for (const i in allRoles) {
      if (allRoles[i].uid === uid) {
        myRoles[i] = allRoles[i];
      }
    }

    for (const i in myRoles) {
      // if (!itemsPositions[i]) {
      itemsPositions[i] = getRandomPosition();
      // }

      myRoles[i].x = itemsPositions[i].x;
      myRoles[i].y = itemsPositions[i].y;
      myRoles[i].z = itemsPositions[i].z;
    }

    yield put(updateVisualizationItemPositionsAction({ itemsPositions }));

    // Update state with master roles list data
    yield put(rolesLoadedAction(normalizeAllRolesData(myRoles)));
  } catch (error) {
    yield put(apiError(error));
  }
}

export function* mergeRolesPositions(positions) {
  try {
    let roles = yield select(state => state.roles);
    for (let i in roles) {
      const id = roles[i].id;
      roles[i].x = positions[id].x;
      roles[i].y = positions[id].y;
      roles[i].z = positions[id].z;
    }
    // Update state with master roles list data
    yield put(rolesLoadedAction(normalizeAllRolesData(roles)));
  } catch (error) {
    yield put(sagaError(error));
  }
}

/*
 *  Load single role from api and normalize data
 */
export function* loadRoleData({ payload }) {
  try {
    // Read single role from API
    const role = yield call(
      api.database.read,
      `${DATABASE_NAMES.ROLES}/${payload.id}`
    );

    // Update state with role data
    yield put(roleLoadedAction(role));
  } catch (error) {
    yield put(apiError(error));
  }
}

/*
 * Generate X number of faux users
 */
export function* generateFauxRoles({ payload }) {
  const { numItems } = payload;
  const humans = yield select(state => state.humans);

  const humansIds = humans.map(human => human.id);

  // Not checking for uniqueness. Need a while loop that checks faux humans against existing ones
  const fauxRoles = getFauxRolesData(numItems, humansIds);
  for (let i = 0; i < numItems; i++) {
    const { name, members } = fauxRoles[i];
    const payload = normalizeRoleData(name, members);
    yield* createRole({ payload });
  }
  // Refresh master human list
  yield* loadAllRolesData();
}

/*
 *  Save new role to api
 */
export function* createRole({ payload }) {
  // const { name, members } = payload;
  try {
    const { uid } = yield select(state => state.user);
    const color = pickRandomColor();
    const roleData = { ...payload, uid, color, created: Date.now().valueOf() };

    // Submit new role to API
    const newRoleID = yield call(
      api.database.create,
      DATABASE_NAMES.ROLES,
      roleData
    );

    // Dispatch role creation success notification
    yield put(roleCreatedAction(newRoleID));
  } catch (error) {
    yield put(apiError(error));
  }
}

/*
 *  Update existing role in api
 */
export function* updateRole({ payload }) {
  try {
    const { name, members, id } = payload;
    const { uid } = yield select(state => state.user);
    if (!id) {
      throw new Error('updateRole requires valid ID');
    }
    // Submit updated role to API
    yield call(api.database.patch, `${DATABASE_NAMES.ROLES}/${id}`, {
      name,
      members,
      uid
    });

    // Dispatch role update success notification
    yield put(roleUpdatedAction(id));
  } catch (error) {
    yield put(apiError(error));
  }
}

/*
 *  Delete existing role from api
 */
export function* deleteRole({ payload }) {
  try {
    const { id, reloadList } = payload;
    const state = yield select(state => state);
    const { visualizations, navigation } = state;
    const { listItemsSelected } = navigation;

    // Check that this id is not currently selected in visualization
    if (id === visualizations.selectedItemId) {
      yield put(resetItemAction());

      // Check that this id is not a selected list itemconst selectedItems = yield select(
      const selectedIndex = listItemsSelected.indexOf(id);
      if (selectedIndex !== -1) {
        const newSelectedItems = removeItemFromList(listItemsSelected, id);

        yield put(setSelectedListItems(newSelectedItems));
      }
    }

    yield call(api.database.delete, `${DATABASE_NAMES.ROLES}/${id}`);
    yield put(roleDeletedAction(id));
    yield put(deleteVisualizationItemPositionAction([id]));

    if (reloadList) {
      yield* removeIdsFromSelectedList([id]);

      // Refresh master role list
      yield* loadAllRolesData();
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

export function* deleteRoles({ payload }) {
  const { ids } = payload;

  for (let i = 0; i < ids.length; i++) {
    yield* deleteRole(deleteRoleAction(ids[i], false));
  }
  yield* removeIdsFromSelectedList(ids);
  yield* loadAllRolesData();
}

function* watchAllRolesLoad() {
  yield takeEvery(ACTIONS.LOAD_ROLES, loadAllRolesData);
}

function* watchRoleLoad() {
  yield takeEvery(ACTIONS.LOAD_ROLE, loadRoleData);
}

function* watchRoleDelete() {
  yield takeEvery(ACTIONS.DELETE_ROLE, deleteRole);
}

function* watchRoleUpdate() {
  yield takeEvery(ACTIONS.UPDATE_ROLE, updateRole);
}

function* watchFauxRoleDataGeneration() {
  yield takeEvery(ACTIONS.AUTO_GENERATE_FAUX_ROLES, generateFauxRoles);
}

export const rolesSagas = [
  watchAllRolesLoad(),
  watchRoleLoad(),
  watchRoleDelete(),
  watchRoleUpdate(),
  watchFauxRoleDataGeneration()
];
