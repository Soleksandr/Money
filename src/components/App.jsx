import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Layout from './Layout';
import Users from './Users';
import Transactions from './Transactions';
import UserTransactions from './UserTransactions';
import AddTransactionForm from './AddTransactionForm';
import AddUserForm from './AddUserForm';
import Transaction from './Transaction';

const App = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/:id/transactions" component={UserTransactions} />
        <Route exact path="/users/new_user" component={AddUserForm} />
        <Route exact path="/transactions" component={Transactions} />
        <Route exact path="/transactions/new_transaction" component={AddTransactionForm} />
        <Route exact path="/transactions/:id" component={Transaction} />
      </Switch>
    </Layout>
  </Router>
);

export default App;
