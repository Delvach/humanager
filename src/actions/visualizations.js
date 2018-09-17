import * as ACTIONS from '../constants/actions';

export const testAction = () => ({
  type: ACTIONS.TEST,
  payload: {}
});

export const testOutputAction = () => ({
  type: ACTIONS.TEST_OUTPUT,
  payload: {}
});
