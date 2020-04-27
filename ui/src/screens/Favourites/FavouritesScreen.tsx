import React from "react";
import styled from "styled-components";

import { Main } from "../../components/Main";
import PostsContainer from "../../shared/components/PostsContainer";
import DetailsContainer from "../../shared/components/DetailsContainer";

const Header = styled.div`
  grid-area: header-left;
`;

const FavouritesScreen: React.FC = function () {
  return (
    <Main>
      <Header>
        <h1>Favourite Posts</h1>
      </Header>
      <PostsContainer>posts</PostsContainer>
      <DetailsContainer>post detail</DetailsContainer>
    </Main>
  );
};

export default FavouritesScreen;
