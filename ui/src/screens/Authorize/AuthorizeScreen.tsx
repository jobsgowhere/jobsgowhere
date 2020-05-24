import React from "react";
import styled from "styled-components";

import { Main } from "../../components/Main";

const Header = styled.div`
  grid-area: header-left;
`;

const AuthorizeScreen: React.FC = function () {
  return (
    <Main>
      <Header>
        <h1>Authroizing</h1>
      </Header>
    </Main>
  );
};

export default AuthorizeScreen;
