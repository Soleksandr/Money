import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UsersList from '../UsersList';
import AddUserForm from '../AddUserForm';

export default class Users extends Component {

  renderUsersList = ({ getUsers, users }) => (
    <UsersList
      getUsers={getUsers}
      users={users}
      isSelectOpportunit={false}
    />
  )

  renderAddUserForm = ({ addUser }) => (
    <AddUserForm addUser={addUser} />
  )

  render() {
    return (
      <div>
        {
          this.props.match.path === '/users' ?
            this.renderUsersList(this.props) :
            this.renderAddUserForm(this.props)
        }
        <Link to="/users/new_user">
          +
        </Link>
      </div>
    );
  }
}
