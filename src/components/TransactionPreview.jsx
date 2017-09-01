import React from 'react';
import PropTypes from 'prop-types';

const TransactionPreview = ({ title, cost, participants }) => (
  <li className="list-group-item">
    <span>{title}</span>
    <span className="badge">
      <i className="fa fa-usd" aria-hidden="true" />{cost}
      <i className="fa fa-users" aria-hidden="true" />{participants.length}
    </span>
  </li>

);

TransactionPreview.propTypes = {
  title: PropTypes.string.isRequired,
  cost: PropTypes.string.isRequired,
  participants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
  })).isRequired,
};

export default TransactionPreview;
