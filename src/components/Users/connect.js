import { connect } from 'react-redux';
import * as usersActions from '../../actions/users';

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  getUsers: usersActions.getUsers(dispatch),
  addUser: usersActions.addUser(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
