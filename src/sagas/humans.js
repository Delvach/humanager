import { call, put, takeEvery, select } from 'redux-saga/effects';

import api from '../api';

import { apiError, sagaError } from '../actions';

// import { setSelectedListItems } from '../actions/navigation';

import {
  deleteHumanAction,
  humanCreatedAction,
  humanDeletedAction,
  humansLoadedAction,
  humanLoadedAction,
  humanUpdatedAction
} from '../actions/humans';

import {
  resetItemAction,
  updateVisualizationItemPositionsAction,
  deleteVisualizationItemPositionAction
} from '../actions/visualizations';

import { roleUpdateAction } from '../actions/roles';

import * as ACTIONS from '../constants/actions';
import * as DATABASE_NAMES from '../constants/api';

// import { removeItemFromList } from '../utils/data';
import { generateRandomFauxAvatarIcon, pickRandomColor } from '../utils/humans';
import { getRandomPosition } from '../utils/visualizations';

import { removeIdsFromSelectedList } from './navigation';

import {
  normalizeAllHumansData,
  getFauxHumansData
  // getFauxAvatarImageURL
} from '../utils/humans';

/*
 *  Define saga tasks
 */

/*
 *  Load humans from api and normalize data
 */
export function* loadAllHumansData() {
  try {
    const { uid } = yield select(state => state.user);

    // Get current positions data
    const { visualizations } = yield select(state => state);
    const itemsPositions = Object.assign({}, visualizations.itemsPositions);

    // Read master humans list from API
    const allHumans = yield call(api.database.read, DATABASE_NAMES.HUMANS);
    const myHumans = {};

    // World's least secure and least efficient means of individual retrievals
    for (const i in allHumans) {
      if (allHumans[i].uid === uid) {
        myHumans[i] = allHumans[i];
      }
    }

    for (const i in myHumans) {
      // if (!itemsPositions[i]) { // This check allows persistent position
      itemsPositions[i] = getRandomPosition();
      // }

      myHumans[i].x = itemsPositions[i].x;
      myHumans[i].y = itemsPositions[i].y;
      myHumans[i].z = itemsPositions[i].z;
    }

    yield put(updateVisualizationItemPositionsAction({ itemsPositions }));

    // Update state with master humans list data
    yield put(humansLoadedAction(normalizeAllHumansData(myHumans)));
  } catch (error) {
    yield put(apiError(error));
  }
}

export function* mergeHumansPositions(positions) {
  try {
    let humans = yield select(state => state.humans);
    for (let i in humans) {
      const id = humans[i].id;
      humans[i].x = positions[id].x;
      humans[i].y = positions[id].y;
      humans[i].z = positions[id].z;
    }
    // Update state with master humans list data
    yield put(humansLoadedAction(normalizeAllHumansData(humans)));
  } catch (error) {
    yield put(sagaError(error));
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
 * Generate X number of faux users
 */
export function* generateFauxHumans({ payload }) {
  const { numItems } = payload;

  // Not checking for uniqueness. Need a while loop that checks faux humans against existing ones
  const fauxHumans = getFauxHumansData(numItems);
  for (let i = 0; i < numItems; i++) {
    const { name, nameFirst, nameLast, title, email, age } = fauxHumans[i];
    yield* createHuman({ name, nameFirst, nameLast, title, email, age });
  }
  // Refresh master human list
  yield* loadAllHumansData();
}

/*
 *  Save new human to api
 */
export function* createHuman(data) {
  try {
    const { uid } = yield select(state => state.user);
    const color = pickRandomColor();
    const avatar = generateRandomFauxAvatarIcon(color);

    const humanData = {
      uid,
      ...data,
      avatar,
      color: `#${color}`,
      created: Date.now().valueOf()
    };
    // Submit new human to API
    const newHumanID = yield call(
      api.database.create,
      DATABASE_NAMES.HUMANS,
      humanData
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
    const { nameFirst, nameLast, title, email, age } = data;
    const { uid } = yield select(state => state.user);

    // Submit updated human to API
    yield call(api.database.patch, `${DATABASE_NAMES.HUMANS}/${data.id}`, {
      nameFirst,
      nameLast,
      title,
      email,
      age,
      uid
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
    const { id, reloadList } = payload;
    const state = yield select(state => state);
    const { roles, visualizations } = state;

    // Is this human a member of any roles?
    const rolesWithMemberId = roles.filter(
      ({ members }) => members.indexOf(id) > -1
    );

    // Check that this id is not currently selected in visualization
    if (id === visualizations.selectedItemId) {
      yield put(resetItemAction());
    }

    // List of roles that need to be updated; trigger sagas from here? Best way to batch them?
    for (let i = 0; i < rolesWithMemberId.length; i++) {
      const role = Object.assign({}, rolesWithMemberId[i]);
      role.members.splice(role.members.indexOf(id), 1);
      yield put(roleUpdateAction(role));
    }

    yield call(api.database.delete, `${DATABASE_NAMES.HUMANS}/${id}`);
    yield put(humanDeletedAction(id));
    yield put(deleteVisualizationItemPositionAction([id]));

    if (reloadList) {
      yield* removeIdsFromSelectedList([id]);

      // Refresh master human list
      yield* loadAllHumansData();
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

export function* deleteHumans({ payload }) {
  const { ids } = payload;

  for (let i = 0; i < ids.length; i++) {
    yield* deleteHuman(deleteHumanAction(ids[i], false));
  }

  yield* removeIdsFromSelectedList(ids);
  yield* loadAllHumansData();
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

function* watchFauxHumanDataGeneration() {
  yield takeEvery(ACTIONS.AUTO_GENERATE_FAUX_HUMANS, generateFauxHumans);
}

export const humansSagas = [
  watchAllHumansLoad(),
  watchHumanLoad(),
  watchHumanDelete(),
  watchFauxHumanDataGeneration()
];
