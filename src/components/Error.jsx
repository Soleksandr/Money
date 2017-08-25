import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ isError, message }) =>
  isError ?
    <div className="error-container">
      <div className="error-message">
        {message}
      </div>
    </div> : null;

module.exports = Error;

Error.propTypes = {
  isError: PropTypes.bool.isRequired,
};
