import createAuth0Client, { Auth0Client, RedirectLoginOptions } from "@auth0/auth0-spa-js";
import produce from "immer";
import { AnyEventObject, assign, Machine } from "xstate";

import JobsGoWhereApiClient from "../shared/services/JobsGoWhereApiClient";

export interface Auth0StateContext {
  client: Auth0Client | null;
}

export interface Auth0StateSchema {
  states: {
    uninitialized: {
      states: {
        initializing: {};
        error: {};
      };
    };
    authenticated: {
      states: {
        idle: {};
        unauthenticating: {};
      };
    };
    unauthenticated: {
      states: {
        idle: {};
        authenticating: {};
        authorizing: {};
      };
    };
  };
}

interface InitializeAuth0ClientOnDoneEvent {
  type: "done.invoke.initializeAuth0Client";
  data: {
    client: Auth0Client;
    isAuthenticated: boolean;
  };
}

interface InitializeAuth0ClientOnErrorEvent {
  type: "error.platform.initializeAuth0Client";
  data: Error;
}

interface LoginEvent {
  type: "LOGIN";
  payload: {};
}

interface SignupEvent {
  type: "SIGNUP";
  payload: {};
}

interface AuthroizeEvent {
  type: "AUTHORIZE";
  payload: {};
}

interface LogoutEvent {
  type: "LOGOUT";
  payload: {};
}

export type Auth0StateEvent =
  | AuthroizeEvent
  | InitializeAuth0ClientOnDoneEvent
  | InitializeAuth0ClientOnErrorEvent
  | LoginEvent
  | LogoutEvent
  | SignupEvent;

// Guards

function isAuthenticated(context: Auth0StateContext, event: Auth0StateEvent): boolean {
  if (event.type === "done.invoke.initializeAuth0Client") {
    return event.data.isAuthenticated;
  }
  return false;
}

// Actions

const initializedAuth0Client = assign<Auth0StateContext, Auth0StateEvent>((context, event) => {
  if (event.type !== "done.invoke.initializeAuth0Client") {
    throw new Error("Invalid codepath");
  }
  const { client } = event.data;
  return produce<Auth0StateContext>(context, (draftState) => {
    draftState.client = client;
    return draftState;
  });
});

// Services

async function initializeAuth0Client() {
  const client = await createAuth0Client({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    domain: process.env.REACT_APP_AUTH0_DOMAIN!,
    // eslint-disable-next-line @typescript-eslint/camelcase, @typescript-eslint/no-non-null-assertion
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID!,
    cacheLocation: "localstorage",
    audience: "jobsgowhere",
  });
  const isAuthenticated = await client.isAuthenticated();
  try {
    const accessToken = await client.getTokenSilently();
    if (accessToken != null) {
      JobsGoWhereApiClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
  } catch (err) {
    console.log(err);
  }
  return {
    isAuthenticated,
    client,
  };
}

async function authenticateAuth0Client(context: Auth0StateContext, event: AnyEventObject) {
  const options: RedirectLoginOptions = {};
  switch (event.type) {
    case "LOGIN": {
      // Do nothing…
      break;
    }
    case "SIGNUP": {
      // eslint-disable-next-line @typescript-eslint/camelcase
      options.screen_hint = "signup";
      break;
    }
    default: {
      throw new Error("Invalid codepath");
    }
  }
  const { client } = context;
  if (client == null) {
    throw new Error("Client not initialized");
  }
  try {
    const redirectUrl = new URL("/auth0/authorize", process.env.REACT_APP_URL);
    // eslint-disable-next-line @typescript-eslint/camelcase
    options.redirect_uri = redirectUrl.href;
    await client.loginWithRedirect(options);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function authorizeAuth0Client(context: Auth0StateContext) {
  const { client } = context;
  if (client == null) {
    throw new Error("Client not initialized");
  }
  await client.handleRedirectCallback();
  const accessToken = await client.getTokenSilently();
  if (accessToken != null) {
    JobsGoWhereApiClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  }
  const user = await client.getUser();
  return {
    user,
  };
}

async function logoutAuth0Client(context: Auth0StateContext) {
  const { client } = context;
  if (client == null) {
    throw new Error("Client not initialized");
  }
  const redirectUrl = new URL("/", process.env.REACT_APP_URL);
  client.logout({
    returnTo: redirectUrl.href,
  });
  delete JobsGoWhereApiClient.defaults.headers.common["Authorization"];
  return {
    user: null,
  };
}

const config = {
  id: "auth0",
  context: {
    client: null,
  },
  initial: "uninitialized" as const,
  states: {
    uninitialized: {
      initial: "initializing" as const,
      states: {
        initializing: {
          invoke: {
            src: "initializeAuth0Client",
            onDone: [
              {
                cond: "isAuthenticated",
                target: "#auth0.authenticated",
                actions: ["initializedAuth0Client"],
              },
              {
                target: "#auth0.unauthenticated",
                actions: ["initializedAuth0Client"],
              },
            ],
            onError: {
              target: "error",
            },
          },
        },
        error: {},
      },
    },
    authenticated: {
      initial: "idle" as const,
      states: {
        idle: {
          on: {
            LOGOUT: {
              target: "unauthenticating",
            },
          },
        },
        unauthenticating: {
          invoke: {
            src: "logoutAuth0Client",
            onDone: {
              target: "#auth0.unauthenticated",
            },
            onError: {
              target: "idle",
            },
          },
        },
      },
    },
    unauthenticated: {
      initial: "idle" as const,
      states: {
        idle: {
          on: {
            AUTHORIZE: {
              target: "authorizing",
            },
            LOGIN: {
              target: "authenticating",
            },
            SIGNUP: {
              target: "authenticating",
            },
          },
        },
        authenticating: {
          invoke: {
            src: "authenticateAuth0Client",
            onDone: {},
            onError: {
              target: "idle",
            },
          },
        },
        authorizing: {
          invoke: {
            src: "authorizeAuth0Client",
            onDone: {
              target: "#auth0.authenticated",
            },
            onError: {
              target: "idle",
            },
          },
        },
      },
    },
  },
};

const options = {
  actions: {
    initializedAuth0Client,
  },
  guards: {
    isAuthenticated,
  },
  services: {
    authenticateAuth0Client,
    authorizeAuth0Client,
    initializeAuth0Client,
    logoutAuth0Client,
  },
};

const machine = Machine<Auth0StateContext, Auth0StateSchema, Auth0StateEvent>(config, options);

export default machine;
