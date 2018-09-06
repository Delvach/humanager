import * as ACTIONS from '../constants/actions';

import { DEFAULT_STATE_ROLES } from '../constants/roles';

export default function roles(state = DEFAULT_STATE_ROLES, { type, payload }) {
  switch (type) {
    case ACTIONS.ROLES_LOADED:
      return payload.roles;
    default:
      return state;
  }
}
