import { combineReducers } from 'redux';
import transactionsReducer from './transactions';
import usersReducer from './users';

export default combineReducers({
  transactions: transactionsReducer,
  users: usersReducer,
});
