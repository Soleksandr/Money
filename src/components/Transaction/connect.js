import { connect } from 'react-redux';

const mapStateToProps = state => ({
  users: state.users,
  transactions: state.transactions,
});

export default connect(mapStateToProps, null);
