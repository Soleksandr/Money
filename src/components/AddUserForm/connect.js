import { connect } from 'react-redux';
import * as usersActions from '../../actions/users';

export const mapDispatchToProps = dispatch => ({
  createUser: usersActions.createUserGQL(dispatch),
});

export default connect(null, mapDispatchToProps);
