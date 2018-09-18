import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import preferences from './preferences';
import navigation from './navigation';
import humans from './humans';
import human from './human';
import roles from './roles';
import role from './role';
import user from './user';
import visualizations from './visualizations';

export default combineReducers({
  preferences,
  navigation,
  humans,
  human,
  roles,
  role,
  user,
  visualizations,
  form: formReducer
});
