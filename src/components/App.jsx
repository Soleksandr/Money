import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Layout from './Layout';
import List from './List';

const UsersList = () => (
  <List users={'asdf'} />
  );

export const App = () => (
  <Router>
    <Layout>
      <Switch>
        <Route exact path="/users" render={UsersList} />
      </Switch>
    </Layout>
  </Router>
);

export default App;
