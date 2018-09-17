import { DEFAULT_STATE_NAVIGATION } from '../constants/navigation';
import * as ACTIONS from '../constants/actions';

export default function navigation(
  state = DEFAULT_STATE_NAVIGATION,
  { type, payload }
) {
  const newState = Object.assign({}, state);
  switch (type) {
    case ACTIONS.SET_NAVIGATION_FROM_PREFS:
      const { tab, leftDrawerOpen, topPaneHeight } = payload;
      return Object.assign(newState, {
        tab,
        leftDrawerOpen,
        topPaneHeight
      });

    // Main navigation
    case ACTIONS.CHANGE_TAB:
      return Object.assign(newState, { tab: payload.tab });

    // Dialog
    case ACTIONS.SET_DIALOG_DATATYPE:
      return Object.assign(newState, {
        dialogDatatype: payload.moduleId
      });

    case ACTIONS.SET_HUMAN_MODAL_OPEN_STATUS:
      return Object.assign(newState, {
        humanModalOpen: payload.open
      });

    case ACTIONS.SET_HUMAN_MODAL_EDIT_ID:
      return Object.assign(newState, {
        humanModalEditId: payload.id
      });

    case ACTIONS.SET_ROLE_MODAL_OPEN_STATUS:
      return Object.assign(newState, {
        roleModalOpen: payload.open
      });

    case ACTIONS.SET_ROLE_MODAL_EDIT_ID:
      return Object.assign(newState, {
        roleModalEditId: payload.id
      });

    case ACTIONS.SET_LEFT_DRAWER_OPEN_STATUS:
      return Object.assign(newState, {
        leftDrawerOpen: payload.open
      });

    case ACTIONS.TRIGGER_VISUALIZATION_RESIZE:
      return Object.assign(newState, {
        triggerVisualizationResize: payload.resize
      });

    default:
      break;
  }
  return state;
}
