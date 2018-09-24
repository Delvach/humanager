import * as ACTIONS from '../constants/actions';

export const testAction = () => ({
  type: ACTIONS.TEST,
  payload: {}
});

export const testOutputAction = () => ({
  type: ACTIONS.TEST_OUTPUT,
  payload: {}
});

export const selectItemAction = (id = null) => ({
  type: ACTIONS.SELECT_VISUALIZATION_ITEM,
  payload: { id }
});

export const resetItemAction = () => ({
  type: ACTIONS.RESET_VISUALIZATION_ITEM,
  payload: {}
});

// export const setItemsPositionsAction = positions => ({
//   type: ACTIONS.STORE_VISUALIZATION_POSITIONS,
//   payload: { positions }
// });

export const randomizeItemsPositionsAction = () => ({
  type: ACTIONS.RANDOMIZE_VISUALIZATION_POSITIONS,
  payload: {}
});

export const updateVisualizationItemPositionsAction = ({ itemsPositions }) => ({
  type: ACTIONS.STORE_VISUALIZATION_ITEMS_POSITIONS,
  payload: { itemsPositions }
});

export const deleteVisualizationItemPositionAction = itemIds => ({
  type: ACTIONS.DELETE_VISUALIZATION_ITEMS_POSITIONS,
  payload: { itemIds }
});

/*
 * Filters
 */
export const changeSortByAction = sortBy => ({
  type: ACTIONS.SET_VISUALIZATION_FILTER_SORTBY,
  payload: { sortBy }
});

export const changeVisualizationBehaviorAction = behavior => ({
  type: ACTIONS.SET_VISUALIZATION_BEHAVIOR,
  payload: { behavior }
});
