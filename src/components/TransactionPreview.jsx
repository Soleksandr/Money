import React from 'react';
import PropTypes from 'prop-types';

const TransactionPreview = ({ title, cost, participantsId }) => (
  <li className="list-group-item">
    <span>{title}</span>
    <span className="badge">
      <i className="fa fa-usd" aria-hidden="true" />{cost}
      <i className="fa fa-users" aria-hidden="true" />{participantsId.length}
    </span>
  </li>

);

TransactionPreview.propTypes = {
  title: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  participantsId: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default TransactionPreview;
