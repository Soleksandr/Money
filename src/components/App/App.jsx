import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import Layout from '../Layout';
import Users from '../Users';
import Transactions from '../Transactions';
import AddTransactionForm from '../AddTransactionForm';
import AddUserForm from '../AddUserForm';
import Transaction from '../Transaction';
import Login from '../Login';

class App extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getTransactions();
  }
  render() {
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/participants" component={Users} />
            <Route exact path="/participants/:id/transactions" component={Transactions} />
            <Route exact path="/new_user" component={AddUserForm} />
            <Route exact path="/all_transactions" component={Transactions} />
            <Route exact path="/new_transaction" component={AddTransactionForm} />
            <Route exact path="/all_transactions/:id" component={Transaction} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default App;

App.propTypes = {
  getTransactions: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
};
