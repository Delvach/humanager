import * as ACTIONS from '../constants/actions';

export const setPreferenceDataAction = data => {
  return {
    type: ACTIONS.SET_PREFERENCES,
    payload: {
      data
    }
  };
};

export const notifySetPreferences = () => ({
  type: ACTIONS.NOTIFY_SET_PREFERENCES,
  payload: {}
});

export const storePreferenceDataAction = tab => ({
  type: ACTIONS.STORE_PREFERENCE,
  payload: {
    tab
  }
});
