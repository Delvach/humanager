import { ActionsUnion, createAction } from '../../utils/actions';
import { CoreActionTypes, User } from './';

export const CoreActions = {
  login: (uid: string, password: string) =>
    createAction(CoreActionTypes.LOGIN, { uid, password }),
  logout: () => createAction(CoreActionTypes.LOGOUT),
  setUser: (user: User) => createAction(CoreActionTypes.SET_USER, { user })
};

export type CoreActionsUnion = ActionsUnion<typeof CoreActions>;
