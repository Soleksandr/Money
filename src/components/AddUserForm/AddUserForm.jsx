import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddUserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      name: '',
      surname: '',
      password: '',
    };
    this.participantsId = [];
  }

  onUsernameChange = ({ target: { value } }) => {
    this.setState({
      username: value,
    });
  }

  onNameChange = ({ target: { value } }) => {
    this.setState({
      name: value,
    });
  }

  onSurnameChange = ({ target: { value } }) => {
    this.setState({
      surname: value,
    });
  }

  onPasswordChange = ({ target: { value } }) => {
    this.setState({
      password: value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.createUser(this.state);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="username"
              value={this.state.username}
              onChange={this.onUsernameChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="name"
              value={this.state.name}
              onChange={this.onNameChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="surname"
              value={this.state.surname}
              onChange={this.onSurnameChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.onPasswordChange}
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
