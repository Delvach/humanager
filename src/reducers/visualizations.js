import * as ACTIONS from '../constants/actions';

import { DEFAULT_STATE_VISUALIZATIONS } from '../constants/visualizations';

export default function visualizations(
  state = DEFAULT_STATE_VISUALIZATIONS,
  { type, payload }
) {
  switch (type) {
    case ACTIONS.SET_VISUAL_CONTAINER_SIZE:
      const { height, width } = payload;
      return Object.assign({}, state, { height, width });

    // Flip test bit
    case ACTIONS.TEST_OUTPUT:
      const bit = !state.bit;
      return Object.assign({}, state, { bit });

    case ACTIONS.SELECT_VISUALIZATION_ITEM:
      const { id } = payload;
      return Object.assign({}, state, { selectedItemId: id });

    case ACTIONS.RESET_VISUALIZATION_ITEM:
      return Object.assign({}, state, { selectedItemId: null });

    // // Allow more incremental position storage?
    // case ACTIONS.STORE_VISUALIZATION_POSITIONS:
    //   const { positions } = payload;
    //   return Object.assign({}, state, { positions });

    case ACTIONS.STORE_VISUALIZATION_ITEMS_POSITIONS:
      const { itemsPositions } = payload;
      const newItemsPositions = Object.assign(
        {},
        state.itemsPositions,
        itemsPositions
      );
      return Object.assign({}, state, { itemsPositions: newItemsPositions });

    case ACTIONS.DELETE_VISUALIZATION_ITEMS_POSITIONS:
      const { itemIds } = payload;
      const updatedItemsPositions = Object.assign({}, state.itemsPositions);
      for (let i = 0; i < itemIds.length; i++) {
        delete updatedItemsPositions[itemIds[i]];
      }

      return Object.assign({}, state, {
        itemsPositions: updatedItemsPositions
      });

    case ACTIONS.SET_VISUALIZATION_FILTER_SORTBY:
      const { sortBy } = payload;
      return Object.assign({}, state, { sortBy });

    default:
      return state;
  }
}
