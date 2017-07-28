import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddTransactionForm extends Component {
  state = {
    title: '',
    cost: '',
    payidBy: '',
  }

  onTitleChange = (e) => {
    this.setState({
      title: `${e.target.value}`
    });
  }

  onCostChange = (e) => {
    this.setState({
      cost: `${e.target.value}`
    });
  }

  onPayidByChange = (e) => {
    this.setState({
      payidBy: `${e.target.value}`
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTransaction(this.state)
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="title"
          name="title"
          value={this.state.title}
          onChange={this.onTitleChange}
        />
        <input
          type="text"
          placeholder="cost"
          name="cost"
          value={this.state.cost}
          onChange={this.onCostChange}
        />
        <input
          type="text"
          placeholder="payidBy"
          name="payidBy"
          value={this.state.payidBy}
          onChange={this.onPayidByChange}
        />
        <button
          type="Submit"
          onSubmit={this.onSubmit}
        >add</button>
      </form>
    );
  }
}

export default AddTransactionForm;
