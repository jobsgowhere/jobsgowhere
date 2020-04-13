import * as React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import Main from "../../components/Main";
import Post from "../../shared/components/Post";
import CategorySelector from "../../shared/components/CategorySelector";
import PostDetail from "../../shared/components/PostDetail";

import { PostInterface, CategoryTypes } from "../../types";

import usePostsReducer from "./hooks/useJobsReducer";
import PostDetailPlaceholder from "../../shared/components/PostDetailPlaceholder";

const ListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const DetailsContainer = styled.div`
  flex: 1;
`;

type JobsScreenProps = {};
const JobsScreen: React.FC<JobsScreenProps> = function() {
  const [state, actions] = usePostsReducer();
  const { toggleFavouriteJob } = actions;

  return (
    <Main>
      <Main.Col>
        <ListContainer>
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
        </ListContainer>
      </Main.Col>
      <Main.Col>
        <CategorySelector category="jobs" />
        <DetailsContainer>
          {state.activeJob ? <PostDetail data={state.activeJob} /> : <PostDetailPlaceholder />}
        </DetailsContainer>
      </Main.Col>
    </Main>
  );
}

export default JobsScreen;
