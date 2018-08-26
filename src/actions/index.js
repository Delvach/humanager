import * as ACTIONS from '../constants/actions';

export const initApp = () => {
  return {
    type: ACTIONS.INITIALIZE_APP,
    payload: {}
  };
};

export const apiError = error => {
  return {
    type: ACTIONS.API_ERROR,
    payload: {
      error
    }
  };
};
