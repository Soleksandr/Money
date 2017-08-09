import { connect } from 'react-redux';

export const mapStateToProps = state => ({
  users: state.users,
});

export default connect(mapStateToProps, null);
