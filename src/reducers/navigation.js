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

    // case ACTIONS.CHANGE_HUMAN_MODAL_STATUS:
    case ACTIONS.SET_HUMAN_MODAL_OPEN_STATUS:
      return Object.assign(newState, {
        humanModalOpen: payload.open
      });

    case ACTIONS.SET_HUMAN_MODAL_EDIT_ID:
      return Object.assign(newState, {
        humanModalEditId: payload.id
      });

    default:
      break;
  }
  return state;
}
