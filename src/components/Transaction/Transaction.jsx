import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UsersList from '../UsersList';


export default class Transaction extends Component {
  render() {
    const id = parseInt(this.props.match.url.split('/').pop(), 10);
    const transaction = this.props.transactions.find(tr =>
      tr.id === id);
    const users = this.props.users.filter(user =>
      transaction.participantsId.some(participantId =>
        participantId === user.id));
    const payer = this.props.users.find(user => user.id === transaction.payerId);
    return (
      <div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            disabled
            value={transaction.title}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            disabled
            value={transaction.cost}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            disabled
            value={`${payer.name} ${payer.surname}`}
          />
        </div>
        <h4>Participants:</h4>
        <UsersList
          className="panel-body"
          users={users}
        />
      </div>
    );
  }
}

Transaction.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
  })).isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    cost: PropTypes.number,
    participantsId: PropTypes.arrayOf(PropTypes.number).isRequired,
    payerId: PropTypes.number.isRequired,
  })).isRequired,
};
