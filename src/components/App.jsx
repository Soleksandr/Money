import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './Layout';
import UsersList from './UsersList';
import TransactionsList from './TransactionsList';
import AddTransactionForm from './AddTransactionForm';
import AddUserForm from './AddUserForm';
import * as transactionActions from '../actions/transactions';
import * as userActions from '../actions/users';

const App = props => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/users" render={() => <UsersList {...props} />} />
        <Route exact path="/users/new_user" render={() => <AddUserForm {...props} />} />
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
  addTransaction: transactionActions.addTransaction(dispatch),
  getUsers: userActions.getUsers(dispatch),
  addUser: userActions.addUser(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

