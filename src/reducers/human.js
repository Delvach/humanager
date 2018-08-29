import * as ACTIONS from '../constants/actions';

import { DEFAULT_STATE_HUMAN } from '../constants/humans';

export default function human(state = DEFAULT_STATE_HUMAN, { type, payload }) {
  const newState = Object.assign({}, state);
  switch (type) {
    case ACTIONS.SET_HUMAN_MODAL_INIT_VALUES:
      return Object.assign(newState, payload);

    // Human loaded from API
    case ACTIONS.HUMAN_LOADED:
      return payload.human;
    case ACTIONS.VALIDATE_HUMAN_NAME:
      newState.name.value = payload.name;
      newState.name.valid = payload.name !== '';
      return newState;

    default:
      return state;
  }
}
