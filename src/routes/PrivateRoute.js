import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isAuthenticated, logout } from '../services/auth';

if(!isAuthenticated()) {
  logout();
}

export default function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route {...rest} render={props => isAuthenticated() ? ( <Component {...props} {...rest} />
        ) : ( <Redirect to="/" /> ) }
    />
  );
}