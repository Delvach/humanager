import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import navigation from './navigation';
import humans from './humans';
import human from './human';
import roles from './roles';
import role from './role';

export default combineReducers({
  navigation,
  humans,
  human,
  roles,
  role,
  form: formReducer
});
