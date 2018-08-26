import * as ACTIONS from '../constants/actions';

export const validateNameAction = name => {
  return {
    type: ACTIONS.VALIDATE_HUMAN_NAME,
    payload: {
      name
    }
  };
};
