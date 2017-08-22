import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UsersList from '../UsersList';

export default class Users extends Component {
  componentDidMount() {
    this.props.getUsers();
    // this.props.getTransactions();
  }
  render() {
    const userTransactions = this.props.transactions.filter(
      t => t.payerId === this.props.user.id || t.participantsId.find(
        p => p.id === this.props.user.id));
    const participants = userTransactions.filter(t => [...t.participantsId, t.payerId]);
    console.log('PARTICIPANTS', participants);
    return (
      <div>
        <UsersList users={this.props.users} />
        <Link to="/registration">
          <i className="fa fa-plus-circle fa-4x" aria-hidden="true" />
        </Link>
      </div>
    );
  }
}

Users.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
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
