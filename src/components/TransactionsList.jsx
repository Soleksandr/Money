import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TransactionPreview from './TransactionPreview';

export default class TransactionsList extends Component {
  componentDidMount() {
    this.props.getTransactions();
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.transactions.map(transaction => (
            <TransactionPreview
              key={transaction.id}
              title={transaction.title}
              cost={transaction.cost}
              participants={transaction.participantsId}
            />
          ))}
        </ul>
        <Link to="/transactions/new_transaction">
          +
        </Link>
      </div>
    );
  }
}

TransactionsList.propTypes = {
  getTransactions: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    cost: PropTypes.number,
    participantsId: PropTypes.arrayOf(PropTypes.number).isRequired,
    payerId: PropTypes.number.isRequired,
  })).isRequired,
};
