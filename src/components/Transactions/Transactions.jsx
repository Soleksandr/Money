import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TransactionsList from '../TransactionsList';

export default class AllTransactions extends Component {
  componentDidMount() {
    this.props.getTransactions();
    this.props.getUsers();
  }
  render() {
    let transactions = this.props.transactions;
    const id = parseInt(this.props.match.params.id, 10);
    if (id) {
      transactions = this.props.transactions.filter(transaction =>
      transaction.participantsId.some(participantId =>
        participantId === id || transaction.payerId === id));
    }

    return (
      <div>
        <TransactionsList transactions={transactions} />
        <Link to="/transactions/new_transaction">
          +
        </Link>
      </div>
    );
  }
}

AllTransactions.propTypes = {
  getTransactions: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    cost: PropTypes.number,
    participantsId: PropTypes.arrayOf(PropTypes.number).isRequired,
    payerId: PropTypes.number.isRequired,
  })).isRequired,
};
