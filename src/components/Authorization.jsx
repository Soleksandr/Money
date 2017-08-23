import React from 'react';

const Authorization = (WrappedComponent, user) => () => {
  console.log('authorization ------- ', user);
  if (user) {
    return <WrappedComponent />;
  }
  return <h3 className="text-warning text-center">This page for authorized users only</h3>;
};

export default Authorization;
