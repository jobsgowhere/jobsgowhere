import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

import { Main } from "../../components/Main";
import Auth0Context from "../../contexts/Auth0";

const Header = styled.div`
  grid-area: header-left;
`;

const AuthorizeScreen: React.FC = function () {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { state, send } = useContext(Auth0Context)!;
  const isAuth0Initialized = !state.matches("uninitialized");
  useEffect(() => {
    if (isAuth0Initialized) {
      send("AUTHORIZE");
    }
  }, [isAuth0Initialized, send]);
  switch (true) {
    case state.matches("uninitialized.initializing"): {
      return (
        <Main>
          <Header>
            <h1>Initializing…</h1>
          </Header>
        </Main>
      );
    }
    case state.matches("authenticated"): {
      return <Redirect to="/" />;
    }
    case state.matches("unauthenticated.authorizing"): {
      return (
        <Main>
          <Header>
            <h1>Authroizing…</h1>
          </Header>
        </Main>
      );
    }
    default: {
      return (
        <Main>
          <Header>
            <h1>Please wait…</h1>
          </Header>
        </Main>
      );
    }
  }
};

export default AuthorizeScreen;
