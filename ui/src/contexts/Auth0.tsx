import { useMachine } from "@xstate/react";
import React, { useMemo } from "react";
import { Interpreter, State } from "xstate";

import Auth0Machine, {
  Auth0StateContext,
  Auth0StateEvent,
  Auth0StateSchema,
} from "../machines/auth0";

type Auth0Interpreter = Interpreter<Auth0StateContext, Auth0StateSchema, Auth0StateEvent>;
interface Auth0ContextValue {
  state: State<Auth0StateContext, Auth0StateEvent, Auth0StateSchema>;
  send: Auth0Interpreter["send"];
  service: Auth0Interpreter;
}

const Auth0Context = React.createContext<Auth0ContextValue | undefined>(undefined);

export const Auth0Provider: React.FC = function (props) {
  const { children } = props;
  const [state, send, service] = useMachine(Auth0Machine);
  const value = useMemo<Auth0ContextValue>(() => {
    return { state, send, service };
  }, [send, service, state]);
  return <Auth0Context.Provider value={value}>{children}</Auth0Context.Provider>;
};

export default Auth0Context;
