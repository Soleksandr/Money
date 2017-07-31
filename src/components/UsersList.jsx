import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserMoneyInfo from './UserMoneyInfo';
import UserSelectionOpp from './UserSelectionOpp';

export default class UsersList extends Component {
  state = {
    isSelectOpportunity: this.props.isSelectOpportunity,
  }

  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.users.map((user) => {
            if (this.props.isSelectOpportunity) {
              return (<UserSelectionOpp
                key={user.id}
                id={user.id}
                name={user.name}
                surname={user.surname}
                onMarkCheckbox={this.props.onMarkCheckbox}
              />);
            }
            return (<UserMoneyInfo
              key={user.id}
              name={user.name}
              surname={user.surname}
            />);
          })}
        </ul>
        <Link to="/users/new_user">
          +
        </Link>
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

