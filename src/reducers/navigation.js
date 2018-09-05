import { DEFAULT_STATE_NAVIGATION } from '../constants/navigation';
import * as ACTIONS from '../constants/actions';

export default function navigation(
  state = DEFAULT_STATE_NAVIGATION,
  { type, payload }
) {
  const newState = Object.assign({}, state);
  switch (type) {
    case ACTIONS.CHANGE_TAB:
      return Object.assign(newState, { tab: payload.tab });

    case ACTIONS.SET_HUMAN_MODAL_OPEN_STATUS:
      return Object.assign(newState, {
        humanModalOpen: payload.open
      });

    case ACTIONS.SET_HUMAN_MODAL_EDIT_ID:
      return Object.assign(newState, {
        humanModalEditId: payload.id
      });

    case ACTIONS.SET_LEFT_DRAWER_OPEN_STATUS:
      return Object.assign(newState, {
        leftDrawerOpen: payload.open
      });

    default:
      break;
  }
  return state;
}
