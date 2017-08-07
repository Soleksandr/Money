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
      <li className="list-group-item">
        <div className="checkbox">
          <label>
            <input
              type="checkbox"
              checked={this.state.isChecked}
              onChange={this.onInputChange}
            />
            {`${name} ${surname}`}
          </label>
        </div>
      </li>);
  }
}

UserPreview.propTypes = {
  id: PropTypes.number.isRequired,
  onMarkCheckbox: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
};
