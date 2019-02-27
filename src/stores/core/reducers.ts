import produce from 'immer';
import { CoreActionsUnion, CoreState, CoreActionTypes } from './';

export const inistialState: CoreState = {
  user: null
};

export function reducer(state: CoreState, action: CoreActionsUnion): CoreState {
  return produce(state || inistialState, (draft: CoreState) => {
    switch (action.type) {
      case CoreActionTypes.SET_USER: {
        const { payload } = action;
        const { user } = payload;
        draft.user = user;
        break;
      }
    }
  });
}
