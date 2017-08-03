import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Layout = props => (
  <section className="container">
    <div className="row well">
      <div className="col-sm-3">
        <div>
          <Link to="/users">
            P
          </Link>
        </div>
        <div>
          <Link to="/transactions">
            T
          </Link>
        </div>
        <div>
          <Link to="/login">
            L
          </Link>
        </div>
      </div>
      <div className="col-sm-9">
        {props.children}
      </div>
    </div>
  </section>);

export default Layout;

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
