import { call, put, takeEvery } from 'redux-saga/effects';

import api from '../api';

import { apiError } from '../actions';

import {
  roleCreatedAction,
  roleDeletedAction,
  rolesLoadedAction,
  roleLoadedAction,
  roleUpdatedAction
} from '../actions/roles';

import * as ACTIONS from '../constants/actions';
import * as DATABASE_NAMES from '../constants/api';

import { normalizeAllRolesData } from '../utils/roles';

/*
 *  Define saga tasks
 */

/*
 *  Load roles from api and normalize data
 */
export function* loadAllRolesData() {
  try {
    // Read master roles list from API
    const allRoles = yield call(api.database.read, DATABASE_NAMES.ROLES);

    // Update state with master roles list data
    yield put(rolesLoadedAction(normalizeAllRolesData(allRoles)));
  } catch (error) {
    yield put(apiError(error));
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
 *  Save new role to api
 */
export function* createRole(data) {
  try {
    // Submit new role to API
    const newRoleID = yield call(
      api.database.create,
      DATABASE_NAMES.ROLES,
      data
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
export function* updateRole({ name, members, id }) {
  try {
    // Submit updated role to API
    yield call(api.database.patch, `${DATABASE_NAMES.ROLES}/${id}`, {
      name,
      members
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
    yield call(api.database.delete, `${DATABASE_NAMES.ROLES}/${payload.id}`);
    yield put(roleDeletedAction(payload.id));

    // Refresh master role list
    yield* loadAllRolesData();
  } catch (error) {
    yield put(apiError(error));
  }
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

export const rolesSagas = [
  watchAllRolesLoad(),
  watchRoleLoad(),
  watchRoleDelete()
];
