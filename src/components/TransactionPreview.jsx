import React from 'react';
import PropTypes from 'prop-types';

const TransactionPreview = ({ title, cost, participantsId }) => (
  <li className="list-group-item">
    <span>{title}</span>
    <span className="badge">{`${cost} ${participantsId.length}`}</span>
  </li>

);

TransactionPreview.propTypes = {
  title: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  participantsId: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default TransactionPreview;
