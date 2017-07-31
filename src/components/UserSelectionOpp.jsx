import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class UserPreview extends Component {
  state = {
    isChecked: false,
  }

  onInputChange = () => {
    if (!this.state.isChecked) {
      this.props.onMarkCheckbox(this.props.id);
    }
    this.setState({
      isChecked: !this.state.isChecked,
    });
  }

  render() {
    const { name, surname } = this.props;

    return (
      <li>
        <input
          type="checkbox"
          value={this.state.isChecked}
          onChange={this.onInputChange}
        />
        <span>{`${name} ${surname}`}</span>
      </li>);
  }
}

UserPreview.propTypes = {
  id: PropTypes.number.isRequired,
  onMarkCheckbox: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
};
