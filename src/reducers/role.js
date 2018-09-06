import * as ACTIONS from '../constants/actions';

import { DEFAULT_STATE_ROLE } from '../constants/roles';

export default function role(state = DEFAULT_STATE_ROLE, { type, payload }) {
  const newState = Object.assign({}, state);
  switch (type) {
    case ACTIONS.SET_ROLE_MODAL_INIT_VALUES:
      return Object.assign(newState, payload);

    case ACTIONS.RESET_ROLE_MODAL_INIT_VALUES:
      return Object.assign({}, DEFAULT_STATE_ROLE);

    // Role loaded from API
    case ACTIONS.ROLE_LOADED:
      return payload.role;

    default:
      return state;
  }
}
