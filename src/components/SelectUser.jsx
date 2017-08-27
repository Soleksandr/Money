import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';

const SelectUser = props => (
  <div>
    <select
      value={props.value}
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
    {
      props.errorMessage ?
        <ErrorMessage message={props.errorMessage} /> : null
    }
  </div>
);

export default SelectUser;

SelectUser.propTypes = {
  value: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  onPayidByChange: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
  })).isRequired,
};

SelectUser.defaultProps = {
  errorMessage: null,
};
