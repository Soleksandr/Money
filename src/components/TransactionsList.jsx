import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TransactionPreview from './TransactionPreview';

export default class TransactionsList extends Component {
  render() {
    return (
      <div>
        <ul>
          {
            this.props.transactions.map(transaction => (
              <Link
                key={transaction.id}
                to={`/transactions/${transaction.id}`}
              >
                <TransactionPreview
                  title={transaction.title}
                  cost={transaction.cost}
                  participantsId={transaction.participantsId}
                />
              </Link>
            ))
          }
        </ul>
      </div>
    );
  }
}

TransactionsList.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    cost: PropTypes.string,
    participantsId: PropTypes.arrayOf(PropTypes.number).isRequired,
    payerId: PropTypes.number.isRequired,
  })).isRequired,
};
