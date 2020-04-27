import * as React from "react";

import { Main } from "../../components/Main";
import Search from "../../shared/components/Search";
import CategorySelector from "../../shared/components/CategorySelector";
import Post from "../../shared/components/Post";
import PostDetail from "../../shared/components/PostDetail";
import PostDetailPlaceholder from "../../shared/components/PostDetailPlaceholder";
import PostsContainer from "../../shared/components/PostsContainer";
import DetailsContainer from "../../shared/components/DetailsContainer";

import { PostInterface } from "../../types";

import usePostsReducer from "./hooks/useJobsReducer";

const JobsScreen: React.FC = function () {
  const [state, actions] = usePostsReducer();
  const { toggleFavouriteJob } = actions;

  return (
    <Main active={Boolean(state.activeJob)}>
      <Search />
      <CategorySelector category="jobs" />
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
      <DetailsContainer active={Boolean(state.activeJob)}>
        {state.activeJob ? <PostDetail data={state.activeJob} /> : <PostDetailPlaceholder />}
      </DetailsContainer>
    </Main>
  );
};

export default JobsScreen;
