import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Layout from './Layout';
import Users from './Users';
import Transactions from './Transactions';

const App = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/:id" component={Transactions} />
        <Route exact path="/users/new_user" component={Users} />
        <Route exact path="/transactions" component={Transactions} />
        <Route exact path="/transactions/new_transaction" component={Transactions} />
      </Switch>
    </Layout>
  </Router>
);

export default App;

