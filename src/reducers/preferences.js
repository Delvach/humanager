import { SET_PREFERENCES } from '../constants/actions';
import { DEFAULT_PREFERENCES } from '../constants/preferences';

export default function preferences(
  state = DEFAULT_PREFERENCES,
  { type, payload }
) {
  const newState = Object.assign({}, state);
  switch (type) {
    case SET_PREFERENCES:
      // const { tabs /* , leftDrawerOpen, topPaneHeight: */ } = payload;
      return Object.assign(newState, payload);
    default:
      break;
  }
  return state;
}
