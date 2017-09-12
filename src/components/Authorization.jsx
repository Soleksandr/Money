import React from 'react';

const Authorization = (WrappedComponent, user, additionProps) => (props) => {
  if (user) {
    const pr = additionProps ? Object.assign({}, props, additionProps) : props;
    return <WrappedComponent {...pr} />;
  }
  return <h3 className="text-warning text-center">This page for authorized users only</h3>;
};

export default Authorization;
