import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UsersList from '../UsersList';

export default class Users extends Component {
  componentDidMount() {
    this.props.getParticipants();
  }
  render() {
    return (
      <div>
        <UsersList users={this.props.participants} />
        <Link to="/registration">
          <i className="fa fa-plus-circle fa-4x" aria-hidden="true" />
        </Link>
      </div>
    );
  }
}

Users.propTypes = {
  // user: PropTypes.PropTypes.shape({
  //   id: PropTypes.number.isRequired,
  //   username: PropTypes.string.isRequired,
  //   name: PropTypes.string.isRequired,
  //   surname: PropTypes.string.isRequired,
  // }),
  participants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
  })).isRequired,
  // transactions: PropTypes.arrayOf(PropTypes.shape({
  //   title: PropTypes.string,
  //   cost: PropTypes.string,
  //   participants: PropTypes.arrayOf(PropTypes.shape({
  //     id: PropTypes.number.isRequired,
  //     name: PropTypes.string.isRequired,
  //     surname: PropTypes.string.isRequired,
  //   })).isRequired,
  //   payer: PropTypes.shape({
  //     id: PropTypes.number.isRequired,
  //     name: PropTypes.string.isRequired,
  //     surname: PropTypes.string.isRequired,
  //   }).isRequired,
  // })).isRequired,
};

// Users.defaultProps = {
//   user: null,
// };
