import { connect } from 'react-redux';
import * as transactionsActions from '../../actions/transactions';

const mapStateToProps = state => ({
  users: state.users,
});

const mapDispatchToProps = dispatch => ({
  addTransaction: transactionsActions.addTransaction(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
