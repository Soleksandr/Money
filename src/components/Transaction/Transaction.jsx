import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class Transaction extends Component {
  renderTransaction = transaction =>
    (<div>
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
          value={`${transaction.payer.name} ${transaction.payer.surname}`}
        />
      </div>
      <h4>Participants:</h4>
      <ul className="list-group">{
        transaction.participants.map(p =>
          (<li
            className="list-group-item"
            key={p.id}
          >
            <div className="checkbox">
              <label>
                <input
                  type="checkbox"
                  checked
                  disabled
                />
                {`${p.name} ${p.surname}`}
              </label>
            </div>
          </li>))
        }</ul>
    </div>)

  render() {
    const id = parseInt(this.props.match.params.id, 10);
    const transaction = this.props.transactions.find(tr =>
      tr.id === id);
    return (
      <div>
        {
          transaction ?
            this.renderTransaction(transaction) :
            <div>Transaction does not exist</div>
        }
      </div>
    );
  }
}

Transaction.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    cost: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
    })).isRequired,
    payer: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};
