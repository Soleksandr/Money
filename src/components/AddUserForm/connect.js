import { connect } from 'react-redux';
import * as userActions from '../../actions/user';
import * as usersActions from '../../actions/users';

export const mapDispatchToProps = dispatch => ({
  createUser: userActions.createUser(dispatch),
  addUser: usersActions.addUser(dispatch),
});

export default connect(null, mapDispatchToProps);
