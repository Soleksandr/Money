import { connect } from 'react-redux';
import * as transactionsActions from '../../actions/transactions';

export const mapStateToProps = state => ({
  users: state.users,
});

export const mapDispatchToProps = dispatch => ({
  addTransaction: transactionsActions.addTransaction(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
