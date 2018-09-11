import { put, takeEvery, select } from 'redux-saga/effects';
import { DEFAULT_PREFERENCES } from '../constants/preferences';
import { setNavigationFromPreferencesAction } from '../actions/navigation';
import {
  setPreferencesAction,
  notifySetPreferencesAction
} from '../actions/preferences';

import * as ACTIONS from '../constants/actions';

export function* loadUserPreferenceData() {
  const storedPrefs = Object.assign({}, DEFAULT_PREFERENCES);
  let validPrefs = false;
  for (const prefName in DEFAULT_PREFERENCES) {
    let prefValue = localStorage.getItem(prefName);
    const valid = prefValue && prefValue !== 'undefined';
    if (valid) {
      switch (prefName) {
        case 'leftDrawerOpen':
          prefValue = prefValue.toLowerCase() === 'true';
          break;
        case 'tab':
        case 'topPaneHeight':
        default:
          prefValue = parseInt(prefValue, 10);
          break;
      }
    }
    if (valid) {
      storedPrefs[prefName] = prefValue;
      validPrefs = true;
    }
  }

  // Store prefs loaded from localstate
  if (validPrefs) {
    yield put(setPreferencesAction(storedPrefs));
  }
}

// Set navigation from prefs
export function* setNavigationFromLoadedPreferenceData() {
  const { tab, leftDrawerOpen, topPaneHeight } = yield select(
    state => state.preferences
  );

  yield put(
    setNavigationFromPreferencesAction(tab, leftDrawerOpen, topPaneHeight)
  );
}

export function* setUserPreferenceData({ payload }) {
  for (const prefName in payload) {
    localStorage.setItem(prefName, payload[prefName]);
    yield put(notifySetPreferencesAction(prefName, payload[prefName]));
  }
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
