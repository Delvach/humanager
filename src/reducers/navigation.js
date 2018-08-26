import { DEFAULT_STATE_NAVIGATION } from '../constants/humans';
import * as ACTIONS from '../constants/actions';

export default function navigation(
  state = DEFAULT_STATE_NAVIGATION,
  { type, payload }
) {
  const newState = Object.assign({}, state);
  switch (type) {
    case ACTIONS.CHANGE_TAB:
      return Object.assign(newState, { tab: payload.tab });

    case ACTIONS.CHANGE_HUMAN_MODAL_STATUS:
      return Object.assign(newState, {
        editHumanModalOpen: payload.open
      });

    default:
      break;
  }
  return state;
}
