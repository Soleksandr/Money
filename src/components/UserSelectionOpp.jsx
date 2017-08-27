import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class UserSelectionOpp extends Component {
  state = {
    isChecked: false,
  }

  // componentDidUpdate() {
  //   this.props.onMarkCheckbox(this.props.id, this.state.isChecked);
  // }

  onCheckboxChange = () => {
    this.setState({ isChecked: !this.state.isChecked }, () =>
      this.props.onMarkCheckbox(this.props.id, this.state.isChecked));
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
              onChange={this.onCheckboxChange}
            />
            {`${name} ${surname}`}
          </label>
        </div>
      </li>);
  }
}

UserSelectionOpp.propTypes = {
  id: PropTypes.number.isRequired,
  onMarkCheckbox: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  surname: PropTypes.string.isRequired,
};
