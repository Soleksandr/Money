import { connect } from 'react-redux';
import * as transactionsActions from '../../actions/transactions';
import * as usersActions from '../../actions/users';

export const mapStateToProps = state => ({
  users: state.users,
  transactions: state.transactions,
});

export const mapDispatchToProps = dispatch => ({
  getTransactions: transactionsActions.getTransactions(dispatch),
  getUsers: usersActions.getUsers(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
