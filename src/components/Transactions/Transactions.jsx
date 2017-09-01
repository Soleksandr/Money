import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TransactionsList from '../TransactionsList';

export default class Transactions extends Component {
  render() {
    let transactions = this.props.transactions;
    const id = parseInt(this.props.match.params.id, 10);
    if (id) {
      transactions = transactions.filter(t =>
        t.payer.id === id || t.participants.find(p => p.id === id));
    }
    return (
      <div>
        <TransactionsList transactions={transactions} />
        <Link to="/new_transaction">
          <i className="fa fa-plus-circle fa-4x" aria-hidden="true" />
        </Link>
      </div>
    );
  }
}

Transactions.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    cost: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
    })).isRequired,
    payer: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};
