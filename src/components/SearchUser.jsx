import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchUser extends Component {
  render = () => {
    const users = ['', ...this.props.users];
    return (
      <select
        className="form-control"
        onChange={this.props.onPayidByChange}
      >
        {users.map(user =>
          (<option
            key={user.id}
            value={user.id}
          >{user.name} {user.surname}
          </option>),
        )}
      </select>
    );
  }
}

SearchUser.propTypes = {
  onPayidByChange: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
  })).isRequired,
};
