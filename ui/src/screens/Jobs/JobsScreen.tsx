import * as React from "react";
import styled from "styled-components";
import { debounce } from "throttle-debounce";

import { Main } from "../../components/Main";
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

const ObsDiv = styled.div`
  outline: 1px solid red;
  padding: 20px;
`;

const JobsScreen: React.FC = function () {
  const [state, actions] = usePostsReducer();
  const { toggleFavouriteJob, updateJobs, refreshJobs } = actions;
  const active = Boolean(state.activeJob);
  const pageRef = React.useRef<number>(1);
  const prevY = React.useRef<number>(0);
  const auth0Ready = useAuth0Ready();

  const [element, setElement] = React.useState<HTMLDivElement | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const observer = React.useRef(
    new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const { y } = entries[0].boundingClientRect;
        if (prevY.current > y) {
          setLoading(true);
          setTimeout(() => {
            handleLoadMore();
          }, 500);
        }
        prevY.current = y;
      },
      { threshold: 1.0 },
    ),
  );

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

  const fetchJobs = (page: number): void => {
    JobsGoWhereApiClient.get<PostInterface[]>(`${process.env.REACT_APP_API}/jobs/${page}`).then(
      (res) => {
        setLoading(false);
        updateJobs(res.data);
      },
    );
  };

  function handleLoadMore() {
    const nextPage = ++pageRef.current;
    fetchJobs(nextPage);
  }

  React.useEffect(() => {
    if (auth0Ready) {
      fetchJobs(pageRef.current);
    }
  }, [auth0Ready]);

  React.useEffect(() => {
    if (element && state.more) {
      loading ? observer.current.unobserve(element) : observer.current.observe(element);
    }
    return () => {
      if (element) {
        observer.current.unobserve(element);
      }
    };
  }, [state.more, loading, element]);

  return (
    <Main active={active}>
      <Search onChange={onSearchChange} />
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
        <ObsDiv ref={setElement}>{loading && "Loading ..."}</ObsDiv>
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
