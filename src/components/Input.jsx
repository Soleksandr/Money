import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

export default class Input extends Component {
  state = {
    isError: false,
    message: '',
  }

  onChange = ({ target: { value } }) => {
    this.props.onChange(value);
  }

  onBlur = ({ target: { value } }) => {
    Object.keys(this.props).forEach(key => {
      switch (key) {
        case 'notEmpty':
          if (!value) {
            this.setState({
              message: `${this.props.placeholder} field is required`,
              isError: true,
            });
          }
          break;
        case 'isNumber':
          if (isNaN(value)) {
            this.props.onChange('');
            this.setState({
              message: `${this.props.placeholder} should be a number`,
              isError: true,
            });
          }
      }
    });
  }

  onFocus = () => {
    this.setState({
      isError: false,
    });
  }

  render() {
    return (
      <div>
        <input
          className="form-control"
          type={this.props.type}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.props.onFocus}
        />
        <Error
          isError={this.state.isError}
          message={this.state.message}
        />
      </div>
    );
  }
}
