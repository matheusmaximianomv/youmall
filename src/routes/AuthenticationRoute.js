import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isAuthenticated } from '../services/auth';

export default function AuthenticationRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route {...rest} render={props => !isAuthenticated() ? ( <Component {...props} {...rest} />
        ) : ( <Redirect to="/" /> ) }
    />
  );
}