import React from 'react';
import PropTypes from 'prop-types';

const SelectUser = props => (
  <select
    value={props.payerId}
    className="form-control"
    onChange={props.onPayidByChange}
  >
    <option
      disabled
      value="default"
      style={{ display: 'none' }}
    >payid by</option>
    {
      props.users.map(user =>
      (<option
        key={user.id}
        value={user.id}
      >{user.name} {user.surname}
      </option>))
    }
  </select>
);

SelectUser.propTypes = {
  payerId: PropTypes.string.isRequired,
  onPayidByChange: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
  })).isRequired,
};

export default SelectUser;
