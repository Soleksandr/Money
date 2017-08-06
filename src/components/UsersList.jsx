import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserPreview from './UserPreview';
import UserSelectionOpp from './UserSelectionOpp';

export default class UsersList extends Component {
  renderUserPreview = ({ id, name, surname }) => (
    <UserPreview
      key={id}
      id={id}
      name={name}
      surname={surname}
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
              this.renderUserPreview(user),
            )
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
