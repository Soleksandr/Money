import { connect } from 'react-redux';

export const mapStateToProps = state => ({
  users: state.users,
  transactions: state.transactions,
  user: state.user,
});

export default connect(mapStateToProps, null);
