import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Layout extends Component {
  render() {
    return (
      <section className="container">
        <div className="row">
          <div className="wrapper">
            <div className="info">
              You are loged in as {this.props.user ? this.props.user.name : 'a guest'}
            </div>
            <nav>
              {
                this.props.user ?
                  <ul className="navigation">
                    <li>
                      <Link className="nav-item" to="/participants">P</Link>
                    </li>
                    <li >
                      <Link className="nav-item" to="/transactions">T</Link>
                    </li>
                    <li>
                      <Link
                        className="nav-item"
                        to="/"
                        onClick={this.props.logout}
                      >O</Link>
                    </li>
                  </ul>
                  :
                  <ul className="navigation">
                    <li>
                      <Link className="nav-item" to="/login">L</Link>
                    </li>
                    <li>
                      <Link className="nav-item" to="/registration">R</Link>
                    </li>
                  </ul>
              }
            </nav>
            <div className="content">
              {this.props.children}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  logout: PropTypes.func.isRequired,
  user: PropTypes.PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
  }),
};

Layout.defaultProps = {
  user: null,
};
