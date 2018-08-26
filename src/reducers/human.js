import * as ACTIONS from '../constants/actions';

import { DEFAULT_STATE_HUMAN } from '../constants/humans';

export default function human(state = DEFAULT_STATE_HUMAN, { type, payload }) {
  switch (type) {
    case ACTIONS.HUMAN_LOADED:
      return payload.human;
    case ACTIONS.VALIDATE_HUMAN_NAME:
      return Object.assign({}, state, {
        name: {
          value: payload.name,
          valid: payload.name !== ''
        }
      });
    case ACTIONS.STORE_HUMAN_ATTRIBUTE:
      return Object.assign({}, state, {
        name: {
          value: payload.name,
          valid: payload.name !== ''
        }
      });
    default:
      return state;
  }
}
