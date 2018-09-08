import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import preferences from './preferences';
import navigation from './navigation';
import humans from './humans';
import human from './human';
import roles from './roles';
import role from './role';

export default combineReducers({
  preferences,
  navigation,
  humans,
  human,
  roles,
  role,
  form: formReducer
});
