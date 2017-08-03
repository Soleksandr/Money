import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TransactionsList from '../TransactionsList';
import AddTransactionForm from '../AddTransactionForm';

export default class Users extends Component {

  renderTransactionsList = ({ getTransactions, transactions }) => (
    <TransactionsList
      getTransactions={getTransactions}
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

  render() {
    return (
      <div>
        {
          this.props.match.path === '/transactions' ?
            this.renderTransactionsList(this.props) :
            this.renderAddTransactionForm(this.props)
        }
        <Link to="/transactions/new_transaction">
          +
        </Link>
      </div>
    );
  }
}
