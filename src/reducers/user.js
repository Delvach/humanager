import { SET_USER_UID } from '../constants/actions';
import { DEFAULT_PREFERENCES } from '../constants/user';

export default function user(state = DEFAULT_PREFERENCES, { type, payload }) {
  const newState = Object.assign({}, state);
  switch (type) {
    case SET_USER_UID:
      const { uid } = payload;
      return Object.assign(newState, { uid });
    default:
      break;
  }
  return state;
}
