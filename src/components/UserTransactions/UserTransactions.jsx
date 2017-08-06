import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TransactionsList from '../TransactionsList';

export default class UserTransactions extends Component {
  render() {
    const id = parseInt(this.props.match.url.split('/').splice(-2, 1), 10);
    const transactions = this.props.transactions.filter(transaction =>
      transaction.participantsId.some(participantId =>
        participantId === id || transaction.payerId === id));
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

UserTransactions.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    cost: PropTypes.number,
    participantsId: PropTypes.arrayOf(PropTypes.number).isRequired,
    payerId: PropTypes.number.isRequired,
  })).isRequired,
};
