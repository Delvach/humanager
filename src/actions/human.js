import { SUBMIT_DIALOG } from '../constants/actions';

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
