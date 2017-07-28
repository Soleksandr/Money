import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddTransactionForm extends Component {
  state = {
    name: '',
    surname: '',
  }

  onNameChange = (e) => {
    this.setState({
      name: `${e.target.value}`
    });
  }

  onSurnameChange = (e) => {
    this.setState({
      surname: `${e.target.value}`
    });
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="name"
          name="name"
          value={this.state.name}
          onChange={this.onNameChange}
        />
        <input
          type="text"
          placeholder="surname"
          name="surname"
          value={this.state.surname}
          onChange={this.onSurnameChange}
        />
        <button
          type="submit"
          onSubmit={this.onSubmit}
        >add</button>
      </form>
    );
  }
}

export default AddTransactionForm;
