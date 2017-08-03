import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class UserPreview extends Component {
  render() {
    const { name, surname } = this.props;

    return (
      <li className="list-group-item">
        <Link to="/users">
          <span>{`${name} ${surname}`}</span>
        </Link>
      </li>
    );
  }
}

UserPreview.propTypes = {
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
};
