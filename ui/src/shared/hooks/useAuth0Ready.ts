import React from "react";

import Auth0Context from "../../contexts/Auth0";

export default function useAuth0Ready() {
  const auth0 = React.useContext(Auth0Context);
  if (auth0 == null) {
    return false;
  }
  const { state } = auth0;
  const uninitialized = state.matches("uninitialized");
  if (uninitialized) {
    return false;
  }
  const unauthenticated = state.matches("unauthenticated");
  if (unauthenticated) {
    return state.matches("unauthenticated.idle");
  }
  return true;
}
