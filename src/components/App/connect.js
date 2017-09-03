import { connect } from 'react-redux';
import * as userActions from '../../actions/user';

export const mapStateToProps = state => ({
  user: state.user,
  isFetching: state.fetching,
});

export const mapDispatchToProps = dispatch => ({
  userInitialize: userActions.userInitialize(dispatch),
  logout: userActions.logout(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
