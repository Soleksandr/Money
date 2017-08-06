import { connect } from 'react-redux';
import * as usersActions from '../../actions/users';

const mapDispatchToProps = dispatch => ({
  addUser: usersActions.addUser(dispatch),
});

export default connect(null, mapDispatchToProps);
