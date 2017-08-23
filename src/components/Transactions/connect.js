import { connect } from 'react-redux';

export const mapStateToProps = state => ({
  transactions: state.transactions,
});

export default connect(mapStateToProps, null);
