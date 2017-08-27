import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';
import validator from '../utils/validator';

export default class Input extends Component {
  state = {
    errorMessage: null,
  }

  onChange = ({ target: { value } }) => {
    this.props.onChange(value);
    if (this.state.errorMessage) {
      this.setState({
        errorMessage: null,
      });
    }
  }
  
  onBlur = ({ target: { value } }) => {
    const errorMessage = validator(value, this.props);
    // console.log(errorMessage);
    if (errorMessage) {
      this.setState({
        errorMessage,
      });
    }
  }


  render() {
    const error = this.props.errorMessage || this.state.errorMessage;
    return (
      <div>
        <input
          className="form-control"
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
        />
        {
          error ? <ErrorMessage message={error} /> : null
        }
      </div>
    );
  }
}

Input.propTypes = {
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

Input.defaultProps = {
  errorMessage: null,
};
