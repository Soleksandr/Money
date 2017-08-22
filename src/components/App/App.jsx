import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from 'react-spinkit';
import Layout from '../Layout';
import Authorization from '../Authorization';
import About from '../About';
import Users from '../Users';
import Transactions from '../Transactions';
import AddTransactionForm from '../AddTransactionForm';
import AddUserForm from '../AddUserForm';
import Transaction from '../Transaction';
import Login from '../Login';
import '../../style/style.scss';

export default class App extends Component {
  componentDidMount() {
    this.props.userInitialize();
  }
  render() {
    return !this.props.isFetching ?
      (<Router>
        <Layout {...this.props}>
          <Switch>
            <Route exact path="/" component={About} />
            <Route exact path="/participants" component={Authorization(Users, this.props.user)} />
            <Route exact path="/participants/:id/transactions" component={Authorization(Transactions, this.props.user)} />
            {/* <Route exact path="/new_user" component={AddUserForm} /> */}
            <Route exact path="/transactions" component={Authorization(Transactions, this.props.user)} />
            <Route exact path="/new_transaction" component={Authorization(AddTransactionForm, this.props.user)} />
            <Route exact path="/transactions/:id" component={Authorization(Transaction, this.props.user)} />
            <Route exact path="/registration" component={AddUserForm} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Layout>
      </Router>) : <Spinner name="double-bounce" />;
  }
}

App.propTypes = {
  userInitialize: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  user: PropTypes.objectOf(PropTypes.string),
};

App.defaultProps = {
  user: null,
  isFetching: false,
};
