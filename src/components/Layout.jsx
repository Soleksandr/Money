import React, { Component } from 'react';
import { Redirect } from 'react-router';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Layout extends Component {
  onLogOut = () => console.log('logout');

  render() {
    return (
      <section className="container">
        <div className="row">
          <div className="wrapper">
            <div className="info">You are loged in as {this.props.user ? this.props.user.name : 'a guest'}</div>
            <nav>
              {
                this.props.user ?
                  <ul className="navigation">
                    <li>
                      <Link className="nav-item" to="/participants">P</Link>
                    </li>
                    <li >
                      <Link className="nav-item" to="/all_transactions">T</Link>
                    </li>
                    <li>
                      <Link className="nav-item" to="/">O</Link>
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
};
