import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchUser extends Component {
  state = {
    searchStr: this.props.payidBy,
  }

  render = () => {
    let users = this.props.users;
    const payer = this.props.payidBy.trim().toLowerCase();

    if (payer.length > 0) {
      users = users.filter(user =>
        user.name.toLowerCase().match(payer),
      );
    }

    return (
      <div>
        <div className="dropdown">
          <input
            data-toggle="dropdown"
            aria-haspopup="true"
            className="form-control"
            type="text"
            value={this.props.payidBy}
            onChange={this.props.onPayidByChange}
            placeholder={this.props.placeholder}
          />
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuDivider">
            {users.map(user =>
              (<li
                key={user.id}
              >{user.name} {user.surname}
              </li>),
            )}
          </ul>
        </div>
      </div>
    );
  }
}

SearchUser.propTypes = {
  placeholder: PropTypes.string,
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
  })).isRequired,
};

SearchUser.defaultProps = {
  placeholder: 'payid by',
};
