import React from 'react';
import PropTypes from 'prop-types';

const UserPreview = ({ name, surname, money }) => (
  <li className="list-group-item">
    <span>{`${name} ${surname}`}</span>
    <span className="badge">{money}</span>
  </li>
);

UserPreview.propTypes = {
  money: PropTypes.number,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
};

UserPreview.defaultProps = {
  money: 0,
};

export default UserPreview;

