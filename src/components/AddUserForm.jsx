import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddUserForm extends Component {
  state = {
    name: '',
    surname: '',
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

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addUser(this.state);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="name"
          value={this.state.name}
          onChange={this.onNameChange}
        />
        <input
          type="text"
          placeholder="surname"
          value={this.state.surname}
          onChange={this.onSurnameChange}
        />
        <button
          type="submit"
        >add</button>
      </form>
    );
  }
}

AddUserForm.propTypes = {
  addUser: PropTypes.func.isRequired,
};
