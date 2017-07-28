import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TransactionPreview extends Component {
  render() {
    const { title, cost, participants } = this.props;
    return (
      <li>
        <span>{title}</span>
        <span>{cost}</span>
        <span>{participants.length}</span>
      </li>);
  }
}

TransactionPreview.propTypes = {
  title: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  participants: PropTypes.arrayOf(PropTypes.number).isRequired,
};
