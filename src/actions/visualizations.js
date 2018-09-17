import * as ACTIONS from '../constants/actions';

export const testAction = () => ({
  type: ACTIONS.TEST,
  payload: {}
});

export const testOutputAction = () => ({
  type: ACTIONS.TEST_OUTPUT,
  payload: {}
});

export const selectItemAction = id => ({
  type: ACTIONS.SELECT_VISUALIZATION_ITEM,
  payload: { id }
});

export const resetItemAction = () => ({
  type: ACTIONS.RESET_VISUALIZATION_ITEM,
  payload: {}
});
