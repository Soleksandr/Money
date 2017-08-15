import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Transaction extends Component {
  renderForm = () => {
    const id = parseInt(this.props.match.params.id, 10);
    const transaction = this.props.transactions.find(tr =>
      tr.id === id);
    const users = this.props.users.filter(user =>
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
          value={`${payer.name.trim()} ${payer.surname.trim()}`}
        />
      </div>
      <h4>Participants:</h4>
      <ul className="list-group">{
        users.map(user =>
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
    const loading = this.props.users.length && this.props.transactions.length;
    return (
      <div>
        {
          loading
          ? this.renderForm()
          : <p>Loading...</p>
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
    cost: PropTypes.number,
    participantsId: PropTypes.arrayOf(PropTypes.number).isRequired,
    payerId: PropTypes.number.isRequired,
  })).isRequired,
};
