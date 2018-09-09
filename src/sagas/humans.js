import { call, put, takeEvery, select } from 'redux-saga/effects';

import api from '../api';

import { apiError } from '../actions';

import {
  humanCreatedAction,
  humanDeletedAction,
  humansLoadedAction,
  humanLoadedAction,
  humanUpdatedAction
} from '../actions/humans';

import { roleUpdateAction } from '../actions/roles';

import * as ACTIONS from '../constants/actions';
import * as DATABASE_NAMES from '../constants/api';

import { normalizeAllHumansData } from '../utils/humans';

/*
 *  Define saga tasks
 */

/*
 *  Load humans from api and normalize data
 */
export function* loadAllHumansData() {
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
export function* loadHumanData({ payload }) {
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

/*
 *  Save new human to api
 */
export function* createHuman(data) {
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
export function* updateHuman(data) {
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
export function* deleteHuman({ payload }) {
  try {
    // Is this human a member of any roles?
    const roles = yield select(state => state.roles);
    const rolesWithMemberId = roles.filter(
      ({ members }) => members.indexOf(payload.id) > -1
    );

    // List of roles that need to be updated; trigger sagas from here? Best way to batch them?
    for (let i = 0; i < rolesWithMemberId.length; i++) {
      const role = Object.assign({}, rolesWithMemberId[i]);
      role.members.splice(role.members.indexOf(payload.id), 1);
      yield put(roleUpdateAction(role));
    }
    // return;

    yield call(api.database.delete, `${DATABASE_NAMES.HUMANS}/${payload.id}`);
    yield put(humanDeletedAction(payload.id));

    // Refresh master human list
    yield* loadAllHumansData();
  } catch (error) {
    yield put(apiError(error));
  }
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
  watchAllHumansLoad(),
  watchHumanLoad(),
  watchHumanDelete()
];
