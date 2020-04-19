import * as React from "react";
import styled from "styled-components";

import Main from "../../components/Main";
import CategorySelector from "../../shared/components/CategorySelector";
import Post from "../../shared/components/Post";
import PostDetail from "../../shared/components/PostDetail";
import PostDetailPlaceholder from "../../shared/components/PostDetailPlaceholder";
import PostsContainer from "../../shared/components/PostsContainer";
import { PostInterface } from "../../types";
import usePostsReducer from "./hooks/useJobsReducer";

const DetailsContainer = styled.div`
  flex: 1;
`;

const JobsScreen: React.FC = function () {
  const [state, actions] = usePostsReducer();
  const { toggleFavouriteJob } = actions;

  return (
    <Main>
      <Main.Col>
        <PostsContainer>
          {state.jobs.map((post: PostInterface) => (
            <Post
              category="jobs"
              active={post.active}
              key={post.id}
              data={post}
              handleFavouriteToggle={(e): void => {
                e.stopPropagation();
                toggleFavouriteJob(post);
              }}
            />
          ))}
        </PostsContainer>
      </Main.Col>
      <Main.Col>
        <CategorySelector category="jobs" />
        <DetailsContainer>
          {state.activeJob ? <PostDetail data={state.activeJob} /> : <PostDetailPlaceholder />}
        </DetailsContainer>
      </Main.Col>
    </Main>
  );
};

export default JobsScreen;
