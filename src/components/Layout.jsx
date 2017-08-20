import React, { Component } from 'react';
import { Redirect } from 'react-router';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Layout extends Component {
  onLogOut = () => console.log('logout');

  render() {
    return (
      <section className="container">
        <div className="row well">
          <div className="col-sm-3">
            <nav className="navbar navbar-default navbar-fixed-side">
            {
              !this.props.user ?
                <ul className="nav navbar-nav">
                  <li className="active">
                    <Link to="/participants">P</Link>
                  </li>
                  <li>
                    <Link to="/all_transactions">T</Link>
                  </li>
                  <li>
                    <button onClick={this.onLogOut}>O</button>
                  </li>
                </ul> : null
            }
            {
              this.props.user ?
                <div>
                  <div>
                    <Link to="/login">L</Link>
                  </div>
                  <div>
                    <Link to="/registration">R</Link>
                  </div>
                </div> : null
            }
            </nav>
          </div>
          <div className="col-sm-9">
            {this.props.children}
          </div>
        </div>
      </section>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
