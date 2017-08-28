import { connect } from 'react-redux';
import * as userActions from '../../actions/user';

export const mapDispatchToProps = dispatch => ({
  login: userActions.login(dispatch),
});

export default connect(null, mapDispatchToProps);
