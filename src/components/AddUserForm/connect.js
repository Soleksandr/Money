import { connect } from 'react-redux';
import * as usersActions from '../../actions/users';

export const mapDispatchToProps = dispatch => ({
  createUser: usersActions.createUser(dispatch),
});

export default connect(null, mapDispatchToProps);
