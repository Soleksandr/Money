import { connect } from 'react-redux';
import * as transactionsActions from '../../actions/transactions';
import * as usersActions from '../../actions/users';
import * as userActions from '../../actions/user';

export const mapStateToProps = state => ({
  users: state.users,
  user: state.user,
  transactions: state.transactions,
});

export const mapDispatchToProps = dispatch => ({
  getTransactions: transactionsActions.getTransactions(dispatch),
  getUsers: usersActions.getUsers(dispatch),
  checkAuthentication: userActions.checkAuthentication(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
