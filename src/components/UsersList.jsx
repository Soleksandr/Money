import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserPreview from './UserPreview';

export default class UsersList extends Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.users.map(user => (
            <UserPreview
              key={user.id}
              name={user.name}
              surname={user.surname}
            />
          ))}
        </ul>
        <Link to="">
          +
        </Link>
      </div>
    );
  }
}

UsersList.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
  })).isRequired,
};
