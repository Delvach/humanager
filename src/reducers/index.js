import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import navigation from './navigation';
import humans from './humans';
import human from './human';

export default combineReducers({
  navigation,
  humans,
  human,
  form: formReducer
});
