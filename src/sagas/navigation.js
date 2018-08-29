import { takeEvery, put, select } from 'redux-saga/effects';

import { SET_HUMAN_MODAL_STATUS } from '../constants/actions';

import { HUMAN_MODAL_MODE_EDIT } from '../constants/humans';

import {
  setHumanModalModeAction,
  setHumanModalEditIdAction,
  setHumanModalOpenStatusAction,
  setHumanModalInitDataAction,
  resetHumanModalInitDataAction
} from '../actions/navigation';

import { uiErrorHandler } from '../utils/core';

// Handle human create/edit open/close & related behaviors
function* setHumanModalStatus({ payload }) {
  const { id, mode, open } = payload;
  const isEditing = mode === HUMAN_MODAL_MODE_EDIT;

  // Set flag indicating modal mode
  yield put(setHumanModalModeAction(mode));

  // If editing, use ID to populate  data
  yield put(setHumanModalEditIdAction(open && isEditing ? id : null));

  if (isEditing) {
    try {
      // Pull all users from state
      const humans = yield select(state => state.humans);

      // Identify specified user by id
      const human = humans.find(hum => hum.id === id);

      // Set data used by initialValues during form render
      yield put(setHumanModalInitDataAction(human));
    } catch (error) {
      uiErrorHandler(`ERROR: Unable to load user ${id}`);
    }
  }

  // Set flag used for modal open status
  yield put(setHumanModalOpenStatusAction(open));

  // When closing, reset human data used to init modal
  if (!open) yield put(resetHumanModalInitDataAction());
}

/*
 * Watch every step taken, every move made
 */
function* watchHumanEditModalStatus() {
  yield takeEvery(SET_HUMAN_MODAL_STATUS, setHumanModalStatus);
}
export const navigationSagas = [watchHumanEditModalStatus()];
