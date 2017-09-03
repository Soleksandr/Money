import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UsersList from '../UsersList';

export default class Participants extends Component {
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

Participants.propTypes = {
  getParticipants: PropTypes.func.isRequired,
  participants: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    money: PropTypes.string.isRequired,
  })).isRequired,
};
