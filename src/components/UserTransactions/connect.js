import { connect } from 'react-redux';
import * as usersActions from '../../actions/users';

const mapStateToProps = state => ({
  users: state.users,
  transactions: state.transactions,
});

const mapDispatchToProps = dispatch => ({
  getUsers: usersActions.getUsers(dispatch),
  getUserTransactions: usersActions.getUserTransactions(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
