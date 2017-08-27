import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UsersList from '../UsersList';

export default class Users extends Component {
  render() {
    const userId = this.props.user.id;
    let participants = this.props.users.filter(
      u => this.props.transactions.find(
        t => (
          u.id === t.payerId && u.id !== userId) ||
          t.participantsId.find(id => u.id === id && u.id !== userId)));
    participants = participants.map((p) => {
      p.money = 0;
      this.props.transactions.forEach((t) => {
        if (t.participantsId.some(id => id === p.id) || t.payerId === p.id) {
          if (userId === t.payerId) {
            p.money = Math.round(((t.cost / (t.participantsId.length)) + p.money) * 100) / 100;
          } else if (p.id === t.payerId) {
            p.money = Math.round(((-t.cost / (t.participantsId.length)) + p.money) * 100) / 100;
          }
        }
      });
      p.money = p.money.toFixed(2);
      return p;
    });
    return (
      <div>
        <UsersList users={participants} />
        <Link to="/registration">
          <i className="fa fa-plus-circle fa-4x" aria-hidden="true" />
        </Link>
      </div>
    );
  }
}

Users.propTypes = {
  user: PropTypes.PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
  }),
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
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

Users.defaultProps = {
  user: null,
};
