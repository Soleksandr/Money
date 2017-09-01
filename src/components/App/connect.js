import { connect } from 'react-redux';
import * as userActions from '../../actions/user';
import * as transactionsActions from '../../actions/transactions';

export const mapStateToProps = state => ({
  user: state.user,
  isFetching: state.fetching,
});

export const mapDispatchToProps = dispatch => ({
  userInitialize: userActions.userInitialize(dispatch),
  logout: userActions.logout(dispatch),
  getTransactions: transactionsActions.getTransactions(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
