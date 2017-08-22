import { combineReducers } from 'redux';
import transactionsReducer from './transactions';
import usersReducer from './users';
import userReducer from './user';

export default combineReducers({
  transactions: transactionsReducer,
  users: usersReducer,
  user: userReducer,
});
