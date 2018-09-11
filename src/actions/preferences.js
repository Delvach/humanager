import * as ACTIONS from '../constants/actions';

// Called from saga after loading user preferences
export const setPreferencesAction = data => {
  return {
    type: ACTIONS.SET_PREFERENCES,
    payload: data
  };
};

export const notifySetPreferencesAction = () => ({
  type: ACTIONS.NOTIFY_SET_PREFERENCES,
  payload: {}
});

export const storeTabPreferenceAction = tab => ({
  type: ACTIONS.STORE_PREFERENCE,
  payload: {
    tab
  }
});

export const storeLeftDrawerOpenPreferenceAction = leftDrawerOpen => ({
  type: ACTIONS.STORE_PREFERENCE,
  payload: {
    leftDrawerOpen
  }
});

export const storeTopPaneHeightPreferenceAction = topPaneHeight => ({
  type: ACTIONS.STORE_PREFERENCE,
  payload: {
    topPaneHeight
  }
});
