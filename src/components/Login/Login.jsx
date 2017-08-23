import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Login extends Component {
  state = {
    username: '',
    password: '',
  };


  onUsernameChange = ({ target: { value } }) => {
    this.setState({
      username: value,
    });
  }

  onPasswordChange = ({ target: { value } }) => {
    this.setState({
      password: value,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.logIn(this.state);
    this.props.history.push('/participants');
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
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.onPasswordChange}
            />
          </div>
          <button
            className="btn btn-default"
            type="submit"
          >sign in</button>
        </form>
      </div>
    )
  }
}