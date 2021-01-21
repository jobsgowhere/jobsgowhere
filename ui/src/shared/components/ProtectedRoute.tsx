import { withAuthenticationRequired } from "@auth0/auth0-react";
import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

const ProtectedRoute: React.FC<RouteProps> = ({ component }, ...args) => {
  if (!component) {
    return <Redirect to="/" />;
  }
  return (
    <Route
      component={withAuthenticationRequired(component, {
        // onRedirecting: () => <div>loading</div>,
      })}
      {...args}
    />
  );
};

export default ProtectedRoute;
