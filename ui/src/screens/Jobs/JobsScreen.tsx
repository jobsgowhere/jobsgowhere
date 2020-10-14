import * as React from "react";
import { debounce } from "throttle-debounce";

import { Main } from "../../components/Main";
import PostLoader from "../../components/PostLoader";
import CategorySelector from "../../shared/components/CategorySelector";
import DetailsContainer from "../../shared/components/DetailsContainer";
import Post from "../../shared/components/Post";
import PostDetail from "../../shared/components/PostDetail";
import PostDetailPlaceholder from "../../shared/components/PostDetailPlaceholder";
import PostsContainer from "../../shared/components/PostsContainer";
import Search from "../../shared/components/Search";
import useAuth0Ready from "../../shared/hooks/useAuth0Ready";
import JobsGoWhereApiClient from "../../shared/services/JobsGoWhereApiClient";
import { PostInterface } from "../../types";
import usePostsReducer from "./hooks/useJobsReducer";

const JobsScreen: React.FC = function () {
  const [state, actions] = usePostsReducer();
  const { updateJobs, refreshJobs } = actions;
  const active = Boolean(state.activeJob);
  const pageRef = React.useRef<number>(1);
  const auth0Ready = useAuth0Ready();

  const debouncedSearch = debounce(500, false, (query) => {
    const body = { text: query };
    JobsGoWhereApiClient.post<PostInterface[]>(
      `${process.env.REACT_APP_API}/jobs/search`,
      body,
    ).then((res) => {
      refreshJobs(res.data);
    });
  });

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    debouncedSearch(e.target.value);
  };

  const fetchJobs = (page: number): Promise<void> => {
    return JobsGoWhereApiClient.get<PostInterface[]>(
      `${process.env.REACT_APP_API}/jobs/${page}`,
    ).then((res) => {
      updateJobs(res.data);
    });
  };

  function handleLoadMore() {
    const nextPage = ++pageRef.current;
    return fetchJobs(nextPage);
  }

  React.useEffect(() => {
    if (auth0Ready) {
      fetchJobs(pageRef.current);
    }
  }, [auth0Ready]);

  return (
    <Main active={active}>
      <Search onChange={onSearchChange} />
      <CategorySelector category="jobs" />
      <PostsContainer>
        {state.jobs.map((post: PostInterface) => (
          <Post category="jobs" active={post.active} key={post.id} data={post} />
        ))}
        <PostLoader hasMore={state.more} onLoadMore={handleLoadMore} />
      </PostsContainer>
      <DetailsContainer active={active}>
        {state.activeJob ? (
          <PostDetail data={state.activeJob} category="jobs" />
        ) : (
          <PostDetailPlaceholder />
        )}
      </DetailsContainer>
    </Main>
  );
};

export default JobsScreen;
