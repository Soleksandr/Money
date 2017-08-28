import { connect } from 'react-redux';
import * as transactionsActions from '../../actions/transactions';

export const mapStateToProps = state => ({
  users: state.users,
});

export const mapDispatchToProps = dispatch => ({
  createTransaction: transactionsActions.createTransaction(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
