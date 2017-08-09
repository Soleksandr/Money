import { connect } from 'react-redux';

export const mapStateToProps = state => ({
  transactions: state.transactions,
  users: state.users,
});

export default connect(mapStateToProps, null);
