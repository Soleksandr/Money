import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TransactionPreview from './TransactionPreview';

export default class TransactionsList extends Component {
  componentDidMount() {
    this.props.param ? 
      this.props.getInitialData(this.props.param) :
      this.props.getInitialData();
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.props.transactions.map(transaction => (
              <TransactionPreview
                key={transaction.id}
                title={transaction.title}
                cost={transaction.cost}
                participants={transaction.participantsId}
              />
            ))
          }
        </ul>
      </div>
    );
  }
}

TransactionsList.propTypes = {
  param: PropTypes.number,
  getInitialData: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    cost: PropTypes.number,
    participantsId: PropTypes.arrayOf(PropTypes.number).isRequired,
    payerId: PropTypes.number.isRequired,
  })).isRequired,
};

