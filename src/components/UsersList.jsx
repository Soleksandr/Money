import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserMoneyInfo from './UserMoneyInfo';
import UserSelectionOpp from './UserSelectionOpp';

export default class UsersList extends Component {
  state = {
    isSelectOpportunity: this.props.isSelectOpportunity,
  }

  componentDidMount() {
    this.props.getUsers();
  }

  renderUserMoneyInfo = ({ id, name, surname }) => (
    <UserMoneyInfo
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
              this.renderUserMoneyInfo(user),
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
  getUsers: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    surname: PropTypes.string,
  })).isRequired,
};

UsersList.defaultProps = {
  onMarkCheckbox: null,
  isSelectOpportunity: false,
};
