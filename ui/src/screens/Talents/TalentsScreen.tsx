import React from "react";
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
import useTalentsReducer from "./hooks/useTalentsReducer";

const TalentsScreen: React.FC = function () {
  const [state, actions] = useTalentsReducer();
  const { updateTalents, refreshTalents } = actions;
  const active = Boolean(state.activeTalent);
  const pageRef = React.useRef<number>(1);
  const auth0Ready = useAuth0Ready();

  const debouncedSearch = debounce(500, false, (query) => {
    const body = { text: query };
    JobsGoWhereApiClient.post<PostInterface[]>(
      `${process.env.REACT_APP_API}/talents/search`,
      body,
    ).then((res) => {
      refreshTalents(res.data);
    });
  });

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    debouncedSearch(e.target.value);
  };

  const fetchTalents = (page: number): Promise<void> => {
    return JobsGoWhereApiClient.get<PostInterface[]>(
      `${process.env.REACT_APP_API}/talents/${page}`,
    ).then((res) => {
      updateTalents(res.data);
    });
  };

  function handleLoadMore() {
    const nextPage = ++pageRef.current;
    return fetchTalents(nextPage);
  }

  React.useEffect(() => {
    if (auth0Ready) {
      fetchTalents(pageRef.current);
    }
  }, [auth0Ready]);

  return (
    <Main active={active}>
      <Search onChange={onSearchChange} />
      <CategorySelector category="talents" />
      <PostsContainer>
        {state.talents.map((talent: PostInterface) => (
          <Post category="talents" active={talent.active} key={talent.id} data={talent} />
        ))}
        <PostLoader hasMore={state.more} onLoadMore={handleLoadMore} />
      </PostsContainer>
      <DetailsContainer active={active}>
        {state.activeTalent ? (
          <PostDetail data={state.activeTalent} category="talents" />
        ) : (
          <PostDetailPlaceholder type="talents" />
        )}
      </DetailsContainer>
    </Main>
  );
};

export default TalentsScreen;
