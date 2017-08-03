import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UsersList from './UsersList';
import SearchUser from './SearchUser';

export default class AddTransactionForm extends Component {
  state = {
    title: '',
    cost: '',
    payidBy: '',
    participantsId: [],
  }

  onTitleChange = ({ target: { value } }) => {
    this.setState({
      title: value,
    });
  }

  onCostChange = ({ target: { value } }) => {
    this.setState({
      cost: value,
    });
  }

  onPayidByChange = ({ target: { value } }) => {
    this.setState({
      payidBy: value,
    });
  }

  onMarkCheckbox = (id) => {
    this.setState({
      participantsId: [...this.state.participantsId, id],
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const payer = this.findPayer();
    if (payer) {
      this.props.addTransaction({
        title: this.state.title,
        cost: parseFloat(this.state.cost),
        payerId: payer.id,
        participantsId: this.state.participantsId,
      });
    }
  }

  findPayer = () => {
    const payerData = this.state.payidBy.split(' ');
    return this.props.users.find(user =>
      (user.name
        .toLowerCase() === payerData[0].toLowerCase() &&
        user.surname.toLowerCase() === payerData[1].toLowerCase()) ||
      (user.name.toLowerCase() === payerData[1].toLowerCase() &&
        user.surname.toLowerCase() === payerData[0].toLowerCase()),
    );
  }

  render() {
    // const users = this.props.users.filter(user =>
    //   user.name.toLowerCase().includes(payerData) || user.surname.toLowerCase().includes(payerData));
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="title"
              value={this.state.title}
              onChange={this.onTitleChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="cost"
              value={this.state.cost}
              onChange={this.onCostChange}
            />
          </div>
          <div className="form-group">
            <SearchUser
              users={this.props.users}
              payidBy={this.state.payidBy}
              onPayidByChange={this.onPayidByChange}
            />
          </div>
        </form>
        <UsersList
          className="panel-body"
          users={this.props.users}
          onMarkCheckbox={this.onMarkCheckbox}
          getUsers={this.props.getUsers}
          isSelectOpportunity
        />
        <button
          className="btn btn-default"
          type="submit"
        >add</button>
      </div>
    );
  }
}

AddTransactionForm.propTypes = {
  getUsers: PropTypes.func.isRequired,
  addTransaction: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
  })).isRequired,
};
