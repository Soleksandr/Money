import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Transaction extends Component {
  renderTransaction = (transaction) => {
    const participants = this.props.users.filter(user =>
      transaction.participantsId.some(participantId =>
        participantId === user.id));
    const payer = this.props.users.find(user => user.id === transaction.payerId);

    return (<div>
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
      <ul className="list-group">{
        participants.map(user =>
          (<li
            className="list-group-item"
            key={user.id}
          >
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  checked
                  disabled
                />
                {`${user.name} ${user.surname}`}
              </label>
            </div>
          </li>))
        }</ul>
    </div>);
  }

  render() {
    const id = parseInt(this.props.match.params.id, 10);
    const transaction = this.props.transactions.find(tr =>
      tr.id === id);
    return (
      <div>
        {
          transaction
          ? this.renderTransaction(transaction)
          : <div>Transaction does not exist</div>
        }
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
    cost: PropTypes.string,
    participantsId: PropTypes.arrayOf(PropTypes.number).isRequired,
    payerId: PropTypes.number.isRequired,
  })).isRequired,
};
