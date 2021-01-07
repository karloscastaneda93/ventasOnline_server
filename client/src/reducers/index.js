import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import prodsReducer from './prodsReducer';
import authReducer from './auth';
import homeReducer from './homeReducer';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  prods: prodsReducer,
  dash: homeReducer
});