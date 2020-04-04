import * as React from "react";
import styled from 'styled-components';

import Main from '../../components/Main';
import Post, { Container as StyledPost } from "./components/Post";
import PostDetail from "./components/PostDetail";

const Container = styled(Main)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
`;

const ListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 1.375rem;

  ${StyledPost} {
    margin-bottom: 1rem;
  }
`;

const DetailsContainer = styled.div`
  flex: 1;
`;

type PostsScreenProps = {};

function PostsScreen(props: PostsScreenProps) {
  return (
    <Container>
      <ListContainer>
        <Post active={true} />
        <Post active={false} />
        <Post active={false} />
        <Post active={false} />
      </ListContainer>
      <DetailsContainer>
        <PostDetail>Details goes here…</PostDetail>
      </DetailsContainer>
    </Container>
  );
}

export default PostsScreen;
