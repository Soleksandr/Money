import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => (
  <div className="error-container">
    <div className="error-message">
      {message}
    </div>
  </div>);

module.exports = ErrorMessage;

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
