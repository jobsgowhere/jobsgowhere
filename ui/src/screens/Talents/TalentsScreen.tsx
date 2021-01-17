import React from "react";
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
import useAuth0Ready from "../../shared/hooks/useAuth0Ready";
import ApiClient from "../../shared/services/ApiClient";
import { PostInterface } from "../../types";
import useTalentsReducer from "./hooks/useTalentsReducer";

const TalentsScreen: React.FC = function () {
  const [state, actions] = useTalentsReducer();
  const { isDetailView } = useMobileViewContext();
  const { updateTalents, refreshTalents } = actions;
  const active = Boolean(state.activeTalent) && isDetailView;
  const pageRef = React.useRef<number>(1);
  const auth0Ready = useAuth0Ready();

  const debouncedSearch = debounce(500, false, (query) => {
    const body = { text: query };
    ApiClient.post<PostInterface[]>(`${process.env.REACT_APP_API}/talents/search`, body).then(
      (res) => {
        refreshTalents(res.data);
      },
    );
  });

  const PostBlock = styled.div`
    & + & {
      margin-top: 1rem;
    }
  `;

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    debouncedSearch(e.target.value);
  };

  const fetchTalents = (page: number): Promise<void> => {
    return ApiClient.get<PostInterface[]>(`${process.env.REACT_APP_API}/talents/${page}`).then(
      (res) => {
        updateTalents(res.data);
      },
    );
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
      <Helmet>
        <title>Talents listing</title>
      </Helmet>
      <Search placeholder="Search talents" onChange={onSearchChange} />
      <CategorySelector category="talents" />
      <PostsContainer>
        {state.fetched ? (
          <>
            {state.talents.map((talent: PostInterface) => (
              <PostBlock key={talent.id}>
                <Post category="talents" active={talent.active} data={talent} />
              </PostBlock>
            ))}
            <PostLoader hasMore={state.more} onLoadMore={handleLoadMore} />
          </>
        ) : (
          <PostSpinner />
        )}
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
