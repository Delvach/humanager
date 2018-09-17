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

    default:
      return state;
  }
}
