import { connect } from 'react-redux';
import * as userActions from '../../actions/user';
// import * as transactionsActions from '../../actions/transactions';
// import * as usersActions from '../../actions/users';

// export const mapStateToProps = state => ({
//   user: state.user,
//   isFetching: state.fetching,
// });

export const mapDispatchToProps = dispatch => ({
  login: userActions.login(dispatch),
  // getTransactions: transactionsActions.getTransactions(dispatch),
  // getUsers: usersActions.getUsers(dispatch),
});

export default connect(null, mapDispatchToProps);