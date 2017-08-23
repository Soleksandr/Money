import { connect } from 'react-redux';
import * as transactionsActions from '../../actions/transactions';
import * as usersActions from '../../actions/users';

export const mapStateToProps = state => ({
  users: state.users,
});

export const mapDispatchToProps = dispatch => ({
  createTransaction: transactionsActions.createTransaction(dispatch),
  // getUsers: usersActions.getUsers(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
