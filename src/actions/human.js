import * as ACTIONS from '../constants/actions';

export const submitHumanFormAction = ({ name = '', email = '', age = '' }) => {
  return {
    type: ACTIONS.SUBMIT_HUMAN_MODAL,
    payload: {
      name,
      email,
      age
    }
  };
};

export const initializeHumanFormAction = () => {
  return {
    type: 'INITIALIZE',
    payload: {}
  };
};
