import createAuth0Client, { Auth0Client } from "@auth0/auth0-spa-js";
import produce from "immer";
import { assign, Machine } from "xstate";

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
    authenticated: {};
    unauthenticated: {
      states: {
        idle: {};
        authenticating: {};
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
  | LogoutEvent;

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
  });
  const isAuthenticated = await client.isAuthenticated();
  return {
    isAuthenticated,
    client,
  };
}

async function authenticateAuth0Client(context: Auth0StateContext) {
  const { client } = context;
  if (client == null) {
    throw new Error("Client not initialized");
  }
  try {
    const redirectUrl = new URL("/auth0/authorize", process.env.REACT_APP_URL);
    await client.loginWithRedirect({
      // eslint-disable-next-line @typescript-eslint/camelcase
      redirect_uri: redirectUrl.href,
    });
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
  const user = await client.getUser();
  return {
    user,
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
      on: {
        LOGOUT: {},
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
  },
};

const machine = Machine<Auth0StateContext, Auth0StateSchema, Auth0StateEvent>(config, options);

export default machine;
