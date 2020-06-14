import React from "react";

import Auth0Context from "../../contexts/Auth0";

export default function useAuth0Ready() {
  const auth0 = React.useContext(Auth0Context);
  const uninitialized = auth0?.state.matches("uninitialized") ?? true;
  const authorizing = auth0?.state.matches("unauthenticated.authorizing") ?? true;
  const ready = !uninitialized && !authorizing;
  return ready;
}
