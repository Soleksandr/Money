import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Layout = props => (
  <section>
    <div>
      <div>
        <Link to="/users" onClick={props.getUsers}>
          P
        </Link>
      </div>
      <div>
        <Link to="/transactions" onClick={props.getTransactions}>
          T
        </Link>
      </div>
      <div>
        <Link to="/login">
          L
        </Link>
      </div>
    </div>
    <div>
      {props.children}
    </div>
  </section>);

export default Layout;

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
