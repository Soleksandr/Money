import { connect } from 'react-redux';
import * as userActions from '../../actions/user';

export const mapDispatchToProps = dispatch => ({
  createUser: userActions.createUser(dispatch),
});

export default connect(null, mapDispatchToProps);
