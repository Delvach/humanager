import { SET_USER_UID } from '../constants/actions';

export const setUserIDAction = uid => ({
  type: SET_USER_UID,
  payload: {
    uid
  }
});
