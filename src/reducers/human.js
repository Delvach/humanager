import * as ACTIONS from '../constants/actions';

import { DEFAULT_STATE_HUMAN } from '../constants/humans';

export default function human(state = DEFAULT_STATE_HUMAN, { type, payload }) {
  const newState = Object.assign({}, state);
  switch (type) {
    case ACTIONS.SET_HUMAN_MODAL_INIT_VALUES:
      return Object.assign(newState, payload);

    case ACTIONS.RESET_HUMAN_MODAL_INIT_VALUES:
      return Object.assign({}, DEFAULT_STATE_HUMAN);

    // Human loaded from API
    case ACTIONS.HUMAN_LOADED:
      return payload.human;

    default:
      return state;
  }
}
