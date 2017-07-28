import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class UserPreview extends Component {
  render() {
    const { name, surname } = this.props;
    return (
      <li>
        <span>{name}</span>
        <span>{surname}</span>
      </li>);
  }
}

UserPreview.propTypes = {
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
};
