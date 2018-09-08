import { put, takeEvery } from 'redux-saga/effects';
import { DEFAULT_PREFERENCES } from '../constants/preferences';
import { changeTab } from '../actions/navigation';
import {
  setPreferenceDataAction,
  notifySetPreferences
} from '../actions/preferences';

import * as ACTIONS from '../constants/actions';

export function* loadUserPreferenceData() {
  const storedPrefs = {};
  let validPrefs = false;
  for (const prefName in DEFAULT_PREFERENCES) {
    let prefValue = localStorage.getItem(prefName);
    const valid = prefValue && prefValue !== 'undefined';
    if (valid && prefName === 'tab') {
      prefValue = parseInt(prefValue, 10);
    }
    if (valid) validPrefs = true;
    storedPrefs[prefName] = valid ? prefValue : DEFAULT_PREFERENCES[prefName];
  }

  // Store prefs loaded from localstate
  if (validPrefs) {
    yield put(setPreferenceDataAction(storedPrefs));
  }

  // Set navigation from prefs
  // (redundant - consolidate or leave 'preferences' as separate source of truth?)
  yield put(changeTab(storedPrefs['tab']));
}

export function* setUserPreferenceData({ payload }) {
  const { tab } = payload;
  localStorage.setItem('tab', tab);

  yield put(notifySetPreferences('tab', tab));
}

function* watchlLoadUserPreferenceData() {
  yield takeEvery(ACTIONS.LOAD_PREFERENCES, loadUserPreferenceData);
}

function* watchSetUserPreferenceData() {
  yield takeEvery(ACTIONS.STORE_PREFERENCE, setUserPreferenceData);
}

export const preferenceSagas = [
  watchlLoadUserPreferenceData(),
  watchSetUserPreferenceData()
];
