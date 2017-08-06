import { connect } from 'react-redux';
import * as usersActions from '../../actions/users';
import * as transactionsActions from '../../actions/transactions';

const mapStateToProps = state => ({
  users: state.users,
  transactions: state.transactions,
});

const mapDispatchToProps = dispatch => ({
  getUsers: usersActions.getUsers(dispatch),
  getTransactions: transactionsActions.getTransactions(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
