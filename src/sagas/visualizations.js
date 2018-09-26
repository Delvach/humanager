import { put, takeEvery, select } from 'redux-saga/effects';

import * as ACTIONS from '../constants/actions';

import { getRandomPosition } from '../utils/visualizations';

import {
  testOutputAction,
  // setItemsPositionsAction,
  updateVisualizationItemPositionsAction
} from '../actions/visualizations';

import { mergeHumansPositions } from './humans';
import { mergeRolesPositions } from './roles';

function* handleTest() {
  yield put(testOutputAction());
}

function* handleRandomizePositions() {
  const state = yield select(state => state);
  const { humans, roles } = state;

  const humansPositions = {};
  const rolesPositions = {};

  for (let i = 0; i < humans.length; i++) {
    humansPositions[humans[i].id] = getRandomPosition();
  }

  for (let i = 0; i < roles.length; i++) {
    rolesPositions[roles[i].id] = getRandomPosition();
  }

  yield* mergeHumansPositions(humansPositions);
  yield* mergeRolesPositions(rolesPositions);

  // Disabled; need to be updated for revised behavior
  // yield put(
  //   setItemsPositionsAction({
  //     humans: humansPositions,
  //     roles: rolesPositions
  //   })
  // );
}

/*
 *  Position data needs to be maintained independent of humans &
 *  roles data for it to persist across reloads. This could happen
 *  a component state, but it's better to have a saga manage it for
 *  consistency. Plus, this way all possible events can be easily
 *  captured for updating.
 * 
 *  NOTE - this is currently only dealing with random positions
 */
function* updateVisualizationSettings({ type, payload }) {
  const state = yield select(state => state);
  const { visualizations } = state;
  const itemsPositions = Object.assign({}, visualizations.itemsPositions);

  switch (type) {
    case ACTIONS.HUMANS_LOADED:
    case ACTIONS.ROLES_LOADED:
      // Process all items
      const { allItemsKeys } = payload;
      // const allItemsKeys = Object.keys({ ...humans, ...roles });
      for (let i in allItemsKeys) {
        const key = allItemsKeys[i];
        if (!itemsPositions[key]) {
          itemsPositions[key] = getRandomPosition();
        }
      }
      break;
    case ACTIONS.HUMAN_CREATED:
    case ACTIONS.ROLE_CREATED:
      // Process new item
      itemsPositions[payload.id] = getRandomPosition();

      break;
    case ACTIONS.HUMAN_DELETED:
    case ACTIONS.ROLE_DELETED:
      // Remove item
      delete itemsPositions[payload.id];
      break;

    case ACTIONS.RANDOMIZE_VISUALIZATION_POSITIONS:
      const { humans, roles, navigation } = yield select(state => state);
      const items = navigation.tab !== 1 ? humans : roles;

      for (let i in items) {
        itemsPositions[items[i].id] = getRandomPosition();
      }
      break;
    default:
      break;
  }

  yield put(updateVisualizationItemPositionsAction({ itemsPositions }));

  // update visualization settings

  // const targetKeys = Object.keys({ ...humans, ...roles });

  // Cleanup - Remove any deleted items from list

  // Maintain list of item positions
  // Add newly created items to list
  //
}

function* watchTest() {
  yield takeEvery(ACTIONS.TEST, handleTest);
}

function* watchRandomizeItemsPositions() {
  yield takeEvery(
    ACTIONS.RANDOMIZE_VISUALIZATION_POSITIONS,
    handleRandomizePositions
  );
}

function* watchVisualizerData() {
  yield takeEvery(
    [
      ACTIONS.HUMANS_LOADED,
      ACTIONS.HUMAN_CREATED,
      ACTIONS.HUMAN_DELETED,
      ACTIONS.ROLES_LOADED,
      ACTIONS.ROLE_CREATED,
      ACTIONS.ROLE_DELETED,
      ACTIONS.RANDOMIZE_VISUALIZATION_POSITIONS
    ],
    updateVisualizationSettings
  );
}

export const visualizationSagas = [
  watchTest(),
  watchRandomizeItemsPositions(),
  watchVisualizerData()
];

// Humans loaded

// Human created
