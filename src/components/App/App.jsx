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
import '../../style/style.scss';

const Authorization = (WrappedComponent, user) =>
  class WithAuthorization extends React.Component {
    state = {
      user,
    }

    render() {
      if (this.state.user) {
        return <WrappedComponent />;
      }
      return <h3 className="text-warning text-center">You are not authorized to view this page</h3>;
    }
  };

const About = () => (
  <div>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo optio alias
    perferendis quam fuga? Nobis modi praesentium unde veritatis dignissimos
    id sequi illo ipsa ut esse incidunt labore laboriosam voluptates, non
    sunt sit quo doloribus voluptas provident, cumque vero! Illo!
  </div>
);

export default class App extends Component {
  // componentDidMount() {
  //   this.props.getUsers();
  //   this.props.getTransactions();
  // }
  render() {
    return (
      <Router>
        <Layout {...this.props}>
          <Switch>
            <Route exact path="/" component={About} />
            <Route exact path="/participants" component={Authorization(Users, this.props.user)} />
            <Route exact path="/participants/:id/transactions" component={Transactions} />
            <Route exact path="/new_user" component={AddUserForm} />
            <Route exact path="/all_transactions" component={Authorization(Transactions, this.props.user)} />
            <Route exact path="/new_transaction" component={AddTransactionForm} />
            <Route exact path="/all_transactions/:id" component={Authorization(Transaction, this.props.user)} />
            <Route exact path="/registration" component={AddUserForm} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Layout>
      </Router>
    );
  }
}

App.propTypes = {
  getTransactions: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
};
