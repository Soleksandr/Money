import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserPreview from './UserPreview';
import UserSelectionOpp from './UserSelectionOpp';

export default class UsersList extends Component {
  renderUserPreview = ({ id, name, surname, money }) => (
    <UserPreview
      id={id}
      name={name}
      surname={surname}
      money={money}
    />
  );

  renderUserSelectionOpp = ({ id, name, surname }) => (
    <UserSelectionOpp
      key={id}
      id={id}
      name={name}
      surname={surname}
      onMarkCheckbox={this.props.onMarkCheckbox}
    />
  );

  render() {
    return (
      <div>
        <ul className="list-group">
          {
            this.props.users.map(user =>
            this.props.isSelectOpportunity ?
              this.renderUserSelectionOpp(user) :
              <Link
                to={`/participants/${user.id}/transactions`}
                key={user.id}
              >
                {this.renderUserPreview(user)}
              </Link>)
          }
        </ul>
      </div>
    );
  }
}

UsersList.propTypes = {
  isSelectOpportunity: PropTypes.bool,
  onMarkCheckbox: PropTypes.func,
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
  })).isRequired,
};

UsersList.defaultProps = {
  onMarkCheckbox: null,
  isSelectOpportunity: false,
};
