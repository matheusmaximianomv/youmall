import React from "react";
import { Route, Redirect } from "react-router-dom";

import { isAuthenticated, getToken } from './../services/auth';

function permission() {
  const user = getToken();
  if(isAuthenticated() && user.database.isAdmin)
    return true;
  return false;
}

export default function AdministratorRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={
      props => permission() ? 
        ( <Component {...props} {...rest} /> ) 
        : ( <Redirect to="/app" /> )
      }
    />
  );
}