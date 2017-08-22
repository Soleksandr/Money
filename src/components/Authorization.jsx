import React from 'react';

const Authorization = (WrappedComponent, user) =>
  class WithAuthorization extends React.Component {
    state = {
      user,
    }

    render() {
      if (this.state.user) {
        return <WrappedComponent />;
      }
      return <h3 className="text-warning text-center">This page for authorized users only</h3>;
    }
  };

export default Authorization;
