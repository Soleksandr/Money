import { connect } from 'react-redux';
import * as userActions from '../../actions/user';

export const mapStateToProps = state => ({
  users: state.users,
  user: state.user,
  transactions: state.transactions,
  isFetching: state.fetching,
});

export const mapDispatchToProps = dispatch => ({
  userInitialize: userActions.userInitialize(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
