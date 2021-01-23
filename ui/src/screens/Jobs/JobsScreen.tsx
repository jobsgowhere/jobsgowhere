import { useAuth0 } from "@auth0/auth0-react";
import * as React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { debounce } from "throttle-debounce";

import { Main } from "../../components/Main";
import PostLoader from "../../components/PostLoader";
import PostSpinner from "../../components/PostSpinner";
import { useMobileViewContext } from "../../contexts/MobileView";
import CategorySelector from "../../shared/components/CategorySelector";
import DetailsContainer from "../../shared/components/DetailsContainer";
import Post from "../../shared/components/Post";
import PostDetail from "../../shared/components/PostDetail";
import PostDetailPlaceholder from "../../shared/components/PostDetailPlaceholder";
import PostsContainer from "../../shared/components/PostsContainer";
import Search from "../../shared/components/Search";
import ApiClient from "../../shared/services/ApiClient";
import { PostInterface } from "../../types";
import usePostsReducer from "./hooks/useJobsReducer";

const PostBlock = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

const JobsScreen: React.FC = function () {
  const [state, actions] = usePostsReducer();
  const { isDetailView } = useMobileViewContext();
  const { updateJobs, refreshJobs } = actions;
  const active = Boolean(state.activeJob && isDetailView);
  const pageRef = React.useRef<number>(1);
  const { getAccessTokenSilently, isLoading } = useAuth0();

  const debouncedSearch = debounce(500, false, async (query) => {
    const body = { text: query };

    try {
      const token = await getAccessTokenSilently();
      ApiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      ApiClient.post<PostInterface[]>(`${process.env.REACT_APP_API}/jobs/search`, body).then(
        (res) => {
          refreshJobs(res.data);
        },
      );
    } catch (e) {
      console.error(e);
    }
  });

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    debouncedSearch(e.target.value);
  };

  const fetchJobs = React.useCallback(
    (page: number): Promise<void> => {
      return ApiClient.get<PostInterface[]>(`${process.env.REACT_APP_API}/jobs/${page}`).then(
        (res) => {
          updateJobs(res.data);
        },
      );
    },
    [updateJobs],
  );

  function handleLoadMore() {
    const nextPage = ++pageRef.current;
    return fetchJobs(nextPage);
  }

  React.useEffect(() => {
    if (!isLoading) {
      fetchJobs(pageRef.current);
    }
  }, [isLoading, fetchJobs]);

  return (
    <Main active={active}>
      <Helmet>
        <title>Jobs listing</title>
      </Helmet>
      <Search placeholder="Search job postings" onChange={onSearchChange} />
      <CategorySelector category="jobs" />
      <PostsContainer>
        {state.fetched ? (
          <>
            {state.jobs.map((post: PostInterface) => (
              <PostBlock key={post.id}>
                <Post category="jobs" active={post.active} data={post} />
              </PostBlock>
            ))}
            <PostLoader hasMore={state.more} onLoadMore={handleLoadMore} />
          </>
        ) : (
          <PostSpinner />
        )}
      </PostsContainer>
      <DetailsContainer active={active}>
        {state.activeJob ? (
          <PostDetail data={state.activeJob} category="jobs" />
        ) : (
          <PostDetailPlaceholder type="jobs" />
        )}
      </DetailsContainer>
    </Main>
  );
};

export default JobsScreen;
