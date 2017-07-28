import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './Layout';
import UsersList from './UsersList';
import TransactionsList from './TransactionsList';
import AddTransactionForm from './AddTransactionForm';
import * as transactionActions from '../actions/transactions';
import * as userActions from '../actions/users';

const App = props => (
  <Router>
    <Layout
      getTransactions={props.getTransactions} 
      getUsers={props.getUsers}
    >
      <Switch>
        <Route exact path="/users" render={() => <UsersList {...props} />} />
        <Route exact path="/transactions" render={() => <TransactionsList {...props} />} />
        <Route exact path="/transactions/new_transaction" render={() => <AddTransactionForm {...props} />} />
      </Switch>
    </Layout>
  </Router>
);


const mapStateToProps = state => ({
  users: state.users,
  transactions: state.transactions,
});

const mapDispatchToProps = dispatch => ({
  getTransactions: transactionActions.getTransactions(dispatch),
  getUsers: userActions.getUsers(dispatch),
  addTransaction: transactionActions.addTransaction(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

