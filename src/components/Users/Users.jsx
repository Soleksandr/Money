import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UsersList from '../UsersList';

export default class Users extends Component {
  componentDidMount() {
    this.props.getUsers();
    this.props.getTransactions();
  }
  render() {
    return (
      <div>
        <UsersList users={this.props.users} />
        <Link to="/new_user">
          +
        </Link>
      </div>
    );
  }
}

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
  })).isRequired,
};
