import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TransactionsList from '../TransactionsList';
import AddTransactionForm from '../AddTransactionForm';

export default class Users extends Component {

  renderTransactionsList = ({ getTransactions, transactions }) => (
    <TransactionsList
      getInitialData={getTransactions}
      transactions={transactions}
    />
  )

  renderAddTransactionForm = ({ addTransaction, users, getUsers }) => (
    <AddTransactionForm
      addTransaction={addTransaction}
      users={users}
      getUsers={getUsers}
    />
  )

  renderUserTransactionsList = ({ getUserTransactions, transactions, id }) => (
    <TransactionsList
      getInitialData={getUserTransactions}
      transactions={transactions}
      param={id}
    />
  )

  render() {
    const path = this.props.match.path;
    let component = null;

    switch (path) {
      case '/transactions':
        component = this.renderTransactionsList(this.props);
        break;
      case '/transactions/new_transaction':
        component = this.renderAddTransactionForm(this.props);
        break;
      case '/users/:id':
        const id = parseInt(this.props.match.url.split('/').pop(), 10);
        component = this.renderUserTransactionsList({ ...this.props, id });
        break;
    }

    return (
      <div>
        {component}
        <Link to="/transactions/new_transaction">
          +
        </Link>
      </div>
    );
  }
}

Users.propTypes = {
  match: PropTypes.objectOf({
    path: PropTypes.string.isRequired,
  }).isRequired,
};
