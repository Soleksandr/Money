import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import validator from '../../utils/validator';

export default class AddUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: {
        value: '',
        errorMessage: null,
      },
      name: {
        value: '',
        errorMessage: null,
      },
      surname: {
        value: '',
        errorMessage: null,
      },
      password: {
        value: '',
        errorMessage: null,
      },
    };
    this.participantsId = [];
  }

  onUsernameChange = (value) => {
    this.setState({
      username: {
        value,
        errorMessage: null,
      },
    });
  }

  onNameChange = (value) => {
    this.setState({
      name: {
        value,
        errorMessage: null,
      },
    });
  }

  onSurnameChange = (value) => {
    this.setState({
      surname: {
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
        case 'name':
          message = validator(
            this.state[prop].value, { $notEmpty: true });
          break;
        case 'surname':
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
      this.props.createUser({
        username: this.state.username.value.trim(),
        name: this.state.name.value.trim(),
        surname: this.state.surname.value.trim(),
        password: this.state.password.value.trim(),
      }).then(() => this.props.history.push('/'));
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
              type="text"
              placeholder="name"
              value={this.state.name.value}
              errorMessage={this.state.name.errorMessage}
              onChange={this.onNameChange}
              $notEmpty
            />
          </div>
          <div className="form-group">
            <Input
              className="form-control"
              type="text"
              placeholder="surname"
              value={this.state.surname.value}
              errorMessage={this.state.surname.errorMessage}
              onChange={this.onSurnameChange}
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
          >submit</button>
        </form>
      </div>
    );
  }
}

AddUserForm.propTypes = {
  createUser: PropTypes.func.isRequired,
};
