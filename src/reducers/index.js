import { combineReducers } from 'redux';

import navigation from './navigation';
import humans from './humans';
import human from './human';

export default combineReducers({
  navigation,
  humans,
  human
});
