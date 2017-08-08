import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UsersList from '../UsersList';
import SelectUser from '../SelectUser';

export default class AddTransactionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      cost: '',
      payerId: 'default',
    };
    this.participantsId = [];
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
      payerId: value,
    });
  }

  onMarkCheckbox = (id, isChecked) => {
    isChecked ?
      this.participantsId = [...this.participantsId, id] :
      this.participantsId = this.participantsId.filter(partId => partId !== id);
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTransaction({
      title: this.state.title,
      cost: parseFloat(this.state.cost),
      payerId: parseInt(this.state.payerId, 10),
      participantsId: this.participantsId,
    });
    this.props.history.push('/all_transactions');
  }

  render() {
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
            <SelectUser
              users={this.props.users}
              payerId={this.state.payerId}
              onPayidByChange={this.onPayidByChange}
            />
          </div>
          <h4>Participants:</h4>
          <UsersList
            className="panel-body"
            users={this.props.users}
            onMarkCheckbox={this.onMarkCheckbox}
            isSelectOpportunity
          />
          <button
            className="btn btn-default"
            type="submit"
          >add</button>
        </form>
      </div>
    );
  }
}

AddTransactionForm.propTypes = {
  addTransaction: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
  })).isRequired,
};
