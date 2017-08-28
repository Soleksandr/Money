import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import validator from '../../utils/validator';

export default class Login extends Component {
  state = {
    username: {
      value: '',
      errorMessage: null,
    },
    password: {
      value: '',
      errorMessage: null,
    },
  };


  onUsernameChange = (value) => {
    this.setState({
      username: {
        value,
        errorMessage: null,
      },
    });
  }

  onPasswordChange = (value) => {
    this.setState({
      password: {
        value,
        errorMessage: null,
      },
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const errorMessages = Object.keys(this.state).map((prop) => {
      let message = null;
      switch (prop) {
        case 'username':
          message = validator(
            this.state[prop].value, { $notEmpty: true });
          break;
        case 'password':
          message = validator(
            this.state[prop].value, { $notEmpty: true });
          break;
      }
      if (message) {
        this.setState({
          [prop]: {
            ...this.state[prop],
            errorMessage: message,
          },
        });
      }
      return message;
    });

    if (!errorMessages.some(m => !!m)) {
      this.props.login({
        username: this.state.username.value.trim(),
        password: this.state.password.value.trim(),
      })
      .then(() =>
        this.props.history.push('/'),
      );
    }
  }
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <Input
              className="form-control"
              type="text"
              placeholder="username"
              value={this.state.username.value}
              errorMessage={this.state.username.errorMessage}
              onChange={this.onUsernameChange}
              $notEmpty
            />
          </div>
          <div className="form-group">
            <Input
              className="form-control"
              type="password"
              placeholder="password"
              value={this.state.password.value}
              errorMessage={this.state.password.errorMessage}
              onChange={this.onPasswordChange}
              $notEmpty
            />
          </div>
          <button
            className="btn btn-default"
            type="submit"
          >log in</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
};
