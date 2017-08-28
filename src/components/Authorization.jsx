import React from 'react';

const Authorization = (WrappedComponent, user) => (props) => {
  if (user) {
    return <WrappedComponent {...props} />;
  }
  return <h3 className="text-warning text-center">This page for authorized users only</h3>;
};

export default Authorization;
