import * as React from "react";
import styled from "styled-components";

import Main from "../../components/Main";
import Post from "./components/Post";
import PostDetail from "./components/PostDetail";

import { PostInterface } from "../../interfaces";

import usePostsReducer from "./hooks/usePostsReducer";

const ListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const DetailsContainer = styled.div`
  flex: 1;
`;

type PostsScreenProps = {};

function PostsScreen(): React.ReactElement {
  const [state, actions] = usePostsReducer();
  const { toggleFavouriteJob } = actions;

  return (
    <Main>
      <Main.Col>
        <ListContainer>
          {state.jobs.map((job: PostInterface) => (
            <Post
              active={job.active}
              key={job.id}
              data={job}
              handleFavouriteToggle={(e): void => {
                e.stopPropagation();
                toggleFavouriteJob(job);
              }}
            />
          ))}
        </ListContainer>
      </Main.Col>
      <Main.Col>
        <DetailsContainer>
          <PostDetail data={state.activePost} />
        </DetailsContainer>
      </Main.Col>
    </Main>
  );
}

export default PostsScreen;
