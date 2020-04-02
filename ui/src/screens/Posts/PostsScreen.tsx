import * as React from "react";
import styled from 'styled-components';

import Main from '../../components/Main';
import Post from './components/Post';

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
`;

const DetailsContainer = styled.div`
  flex: 1;
`;

type PostsScreenProps = {};

function PostsScreen(props: PostsScreenProps) {
  return (
    <Container>
      <ListContainer>
        <Post />
        <Post />
        <Post />
        <Post />
      </ListContainer>
      <DetailsContainer>
        Details goes here…
      </DetailsContainer>
    </Container>
  );
}

export default PostsScreen;
