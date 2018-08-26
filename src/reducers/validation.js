import * as ACTIONS from '../constants/validation';

import { DEFAULT_STATE_VALIDATION } from '../constants/validation';

export default function validation(
  state = DEFAULT_STATE_VALIDATION,
  { type, payload }
) {
  switch (type) {
    case ACTIONS.VALIDATE_NAME:
      return Object.assign({}, state, { name: payload.name !== '' });
    default:
      return state;
  }
}
