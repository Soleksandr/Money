import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import UsersList from '../UsersList';
import SelectUser from '../SelectUser';
import { validator } from '../../utils/validator';

export default class AddTransactionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: {
        value: '',
        errorMessage: null,
      },
      cost: {
        value: '',
        errorMessage: null,
      },
      payerId: {
        value: 'default',
        errorMessage: null,
      },
      participantsId: {
        value: [],
        errorMessage: null,
      },
    };
  }

  onTitleChange = (value) => {
    this.setState({
      title: {
        value,
        errorMessage: null,
      },
    });
  }

  onCostChange = (value) => {
    this.setState({
      cost: {
        value,
        errorMessage: null,
      },
    });
  }

  onPayidByChange = ({ target: { value } }) => {
    this.setState({
      payerId: {
        value,
        errorMessage: null,
      },
    });
  }

  onMarkCheckbox = (id, isChecked) => {
    isChecked ?
      this.setState({
        participantsId: {
          value: [...this.state.participantsId.value, id],
          errorMessage: null,
        },
      }) :
      this.setState({
        participantsId: {
          ...this.state.participantsId,
          value: this.state.participantsId.value.filter(pId => pId !== id),
        },
      });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const errorMessages = Object.keys(this.state).map((prop) => {
      let message = null;
      switch (prop) {
        case 'title':
          message = validator(
            this.state[prop].value, { $notEmpty: true });
          break;
        case 'cost':
          message = validator(
            this.state[prop].value, { $notEmpty: true });
          break;
        case 'payerId':
          message = validator(
            this.state[prop].value, { $anySelected: true });
          break;
        case 'participantsId':
          message = validator(
            this.state[prop].value, { $checkedNumber: 1 });
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
      this.props.createTransaction({
        title: this.state.title.value.trim(),
        cost: Math.round(this.state.cost.value * 100) / 100,
        payerId: parseInt(this.state.payerId.value, 10),
        participantsId: this.state.participantsId.value,
      }).then(() => this.props.history.push('/transactions'));
    }
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
              errorMessage={this.state.title.errorMessage}
              $notEmpty
            />
          </div>
          <div className="form-group">
            <Input
              type="text"
              placeholder="cost"
              value={this.state.cost.value}
              onChange={this.onCostChange}
              errorMessage={this.state.cost.errorMessage}
              $isNumber
              $notEmpty
            />
          </div>
          <div className="form-group">
            <SelectUser
              users={this.props.users}
              value={this.state.payerId.value}
              errorMessage={this.state.payerId.errorMessage}
              onPayidByChange={this.onPayidByChange}
            />
          </div>
          <h4>Participants:</h4>
          <UsersList
            className="panel-body"
            users={this.props.users.sort()}
            onMarkCheckbox={this.onMarkCheckbox}
            errorMessage={this.state.participantsId.errorMessage}
            isSelectOpportunity
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
