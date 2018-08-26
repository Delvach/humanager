import * as ACTIONS from '../constants/actions';

import { DEFAULT_STATE_HUMANS } from '../constants/humans';

export default function humans(
  state = DEFAULT_STATE_HUMANS,
  { type, payload }
) {
  switch (type) {
    case ACTIONS.HUMANS_LOADED:
      return payload.humans;
    default:
      return state;
  }
}
