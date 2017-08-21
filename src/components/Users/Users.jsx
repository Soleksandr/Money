import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UsersList from '../UsersList';

const Users = ({ users }) => (
  <div>
    <UsersList users={users} />
    <Link to="/new_user">
      <i className="fa fa-plus-circle fa-4x" aria-hidden="true" />
    </Link>
  </div>
);

Users.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
  })).isRequired,
};

export default Users;
