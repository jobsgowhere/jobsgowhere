import { useAuth0 } from "@auth0/auth0-react";
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

const PostBlock = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

const TalentsScreen: React.FC = function () {
  const [state, actions] = useTalentsReducer();
  const { isDetailView } = useMobileViewContext();
  const { updateTalents, refreshTalents } = actions;
  const active = Boolean(state.activeTalent) && isDetailView;
  const pageRef = React.useRef<number>(1);
  const auth0Ready = useAuth0Ready();
  const { getAccessTokenSilently } = useAuth0();

  const debouncedSearch = debounce(500, false, async (query) => {
    const body = { text: query };

    try {
      const token = await getAccessTokenSilently();
      ApiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      ApiClient.post<PostInterface[]>(`${process.env.REACT_APP_API}/talents/search`, body).then(
        (res) => {
          refreshTalents(res.data);
        },
      );
    } catch (e) {
      console.error(e);
    }
  });

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    debouncedSearch(e.target.value);
  };

  const fetchTalents = React.useCallback(
    (page: number): Promise<void> => {
      return ApiClient.get<PostInterface[]>(`${process.env.REACT_APP_API}/talents/${page}`).then(
        (res) => {
          updateTalents(res.data);
        },
      );
    },
    [updateTalents],
  );

  function handleLoadMore() {
    const nextPage = ++pageRef.current;
    return fetchTalents(nextPage);
  }

  React.useEffect(() => {
    if (auth0Ready) {
      fetchTalents(pageRef.current);
    }
  }, [auth0Ready, fetchTalents]);

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
