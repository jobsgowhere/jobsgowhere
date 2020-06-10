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

import { toast } from "../../components/useToast";

const JobsScreen: React.FC = function () {
  const [state, actions] = usePostsReducer();
  const { toggleFavouriteJob } = actions;
  const active = Boolean(state.activeJob);

  return (
    <Main active={active}>
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
      <DetailsContainer active={active}>
        {state.activeJob ? <PostDetail data={state.activeJob} /> : <PostDetailPlaceholder />}
        <div>
          <button onClick={() => toast("👍 hey ya")}>show toast</button>
        </div>
      </DetailsContainer>
    </Main>
  );
};

export default JobsScreen;
