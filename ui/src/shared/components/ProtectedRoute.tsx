import * as React from "react";
import { Route, RouteProps } from "react-router-dom";

import Auth0Context from "../../contexts/Auth0";

const ProtectedRoute: React.FC<RouteProps> = ({ component: Component }, ...rest) => {
  const auth0Context = React.useContext(Auth0Context);
  const isAuthenticated = auth0Context?.state.matches("authenticated") ?? false;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated && Component) return <Component {...rest} {...props} />;
        auth0Context?.send("LOGIN");
      }}
    />
  );
};

export default ProtectedRoute;
