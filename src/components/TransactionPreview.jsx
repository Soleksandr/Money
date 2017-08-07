import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TransactionPreview extends Component {
  render() {
    const { title, cost, participantsId } = this.props;

    return (
      <li className="list-group-item">
        <span>{`${title}`}</span>
        <span className="badge">{`${cost} ${participantsId.length}`}</span>
      </li>);
  }
}

TransactionPreview.propTypes = {
  title: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  participantsId: PropTypes.arrayOf(PropTypes.number).isRequired,
};
