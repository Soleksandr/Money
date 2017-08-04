import { connect } from 'react-redux';
import * as transactionsActions from '../../actions/transactions';
import * as usersActions from '../../actions/users';

const mapStateToProps = state => ({
  users: state.users,
  transactions: state.transactions,
});

const mapDispatchToProps = dispatch => ({
  getTransactions: transactionsActions.getTransactions(dispatch),
  addTransaction: transactionsActions.addTransaction(dispatch),
  getUsers: usersActions.getUsers(dispatch),
  getUserTransactions: usersActions.getUserTransactions(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
