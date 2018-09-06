import { SUBMIT_DIALOG } from '../constants/actions';

// Use this to populate default values
// import { HUMAN_ATTRIBUTES } from '../constants/humans';

export const submitCreateEditDialogAction = ({
  name = '',
  email = '',
  age = ''
}) => {
  return {
    type: SUBMIT_DIALOG,
    payload: {
      name,
      email,
      age
    }
  };
};
