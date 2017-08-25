import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import UsersList from '../UsersList';
import SelectUser from '../SelectUser';
import Error from '../Error';

export default class AddTransactionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: {
        isError: false,
        value: '',
        message: '',
      },
      cost: {
        isError: false,
        value: '',
        message: '',
      },
      message: {
        isError: false,
        value: '',
        message: '',
      },
      payerId: 'default',
    };
    this.participantsId = [];
  }

  onFocus = () => {
    this.setState({
      title: {
        isError: false,
      },
    });
  }

  onTitleChange = (value) => {
    this.setState({
      title: value,
    });
  }

  onCostChange = (value) => {
    this.setState({
      cost: value,
    });
  }

  onPayidByChange = (value) => {
    this.setState({
      payerId: value,
    });
  }

  onMarkCheckbox = (id, isChecked) => {
    isChecked ?
      this.participantsId = [...this.participantsId, id] :
      this.participantsId = this.participantsId.filter(pId => pId !== id);
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.title.value) {
      this.setState({
        title: {
          isError: true,
          message: 'this field is required',
        },
      });
      return;
    }
    this.props.createTransaction({
      title: this.state.title,
      cost: Math.round(this.state.cost * 100) / 100,
      payerId: parseInt(this.state.payerId, 10),
      participantsId: this.participantsId,
    });
    this.props.history.push('/transactions');
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <Input
              type="text"
              placeholder="title"
              value={this.state.title.value}
              onChange={this.onTitleChange}
              onFocus={this.onFocus}
              notEmpty
            />
            <Error
              isError={this.state.title.isError}
              message={this.state.title.message}
            />
          </div>
          <div className="form-group">
            <Input
              type="text"
              placeholder="cost"
              value={this.state.cost}
              onChange={this.onCostChange}
              isNumber
              notEmpty
            />
            <Error
              isError={this.state.cost.isError}
              message={this.state.cost.message}
            />
          </div>
          <div className="form-group">
            <SelectUser
              users={this.props.users}
              payerId={this.state.payerId}
              onPayidByChange={this.onPayidByChange}
            />
            <Error
              isError={this.state.payerId.isError}
              message={this.state.payerId.message}
            />
          </div>
          <h4>Participants:</h4>
          <UsersList
            className="panel-body"
            users={this.props.users}
            onMarkCheckbox={this.onMarkCheckbox}
            isSelectOpportunity
          />
          <Error
            isError={this.state.payerId.isError}
            message={this.state.payerId.message}
          />
          <button
            className="btn btn-default"
            type="submit"
          >create</button>
        </form>
      </div>
    );
  }
}

AddTransactionForm.propTypes = {
  createTransaction: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
  })).isRequired,
};
