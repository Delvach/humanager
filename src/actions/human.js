import * as ACTIONS from '../constants/actions';

export const setHumanAttribute = ({ attrib, value }) => {
  return {
    type: ACTIONS.STORE_HUMAN_ATTRIBUTE,
    payload: {
      attrib,
      value
    }
  };
};
