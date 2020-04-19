import React from "react";
import { RouteProps } from "react-router";
import styled from "styled-components";

import { StyledMain } from "../../components/Main";
import NewPostForm from "./components/NewPostForm";

const Main = styled(StyledMain)`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const NewPostScreen: React.FC<RouteProps> = function () {
  return (
    <Main>
      <h1>New Post</h1>
      <NewPostForm />
    </Main>
  );
};

export default NewPostScreen;
