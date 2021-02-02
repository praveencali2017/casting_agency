import React, { useEffect, useState } from 'react';
import {useAuth0} from '@auth0/auth0-react'
// Main App Components
function LoginLogout() {
    const {
        isAuthenticated,
        loginWithRedirect,
        logout,
        user
      } = useAuth0();

  return (
    <div>
      {isAuthenticated && <div className='row'>
        <div className='col'>
          Hello {user.name}
        </div>
        </div>}
      <div className="row">
        {!isAuthenticated ?
        <div className="col-2">
          <div className="btn-success btn-sm" onClick={() => loginWithRedirect()}>
            Login
          </div>
        </div>:
        <div className="col-2">
        <div className="btn-danger btn-sm" onClick={() => logout()}>
          Logout
        </div>
      </div>}
      </div>
    </div>
  );
}
export default LoginLogout;
