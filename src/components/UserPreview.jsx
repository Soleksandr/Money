import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class UserPreview extends Component {
  render() {
    const { name, surname, money, id } = this.props;

    return (
      <li className="list-group-item">
        <Link to={`/users/${id}`}>
          <span>{`${name} ${surname}`}</span>
        </Link>
        <span className="badge">{money}</span>
      </li>
    );
  }
}

UserPreview.propTypes = {
  id: PropTypes.number.isRequired,
  money: PropTypes.number,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
};

UserPreview.defaultProps = {
  money: 0,
};
