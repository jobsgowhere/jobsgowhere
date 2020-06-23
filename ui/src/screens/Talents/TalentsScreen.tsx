import React from "react";
import styled from "styled-components";
import axios from "axios";

import { Main } from "../../components/Main";
import Search from "../../shared/components/Search";
import CategorySelector from "../../shared/components/CategorySelector";
import Post from "../../shared/components/Post";
import PostDetail from "../../shared/components/PostDetail";
import PostDetailPlaceholder from "../../shared/components/PostDetailPlaceholder";
import PostsContainer from "../../shared/components/PostsContainer";
import DetailsContainer from "../../shared/components/DetailsContainer";
import { PostInterface } from "../../types";
import useTalentsReducer from "./hooks/useTalentsReducer";

const ObsDiv = styled.div`
  outline: 1px solid blue;
  padding: 20px;
`;

const TalentsScreen: React.FC = function () {
  const [state, actions] = useTalentsReducer();
  const { updateTalents } = actions;
  const active = Boolean(state.activeTalent);
  const pageRef = React.useRef<number>(1);
  const prevY = React.useRef<number>(0);

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

  const fetchTalents = (page: number): void => {
    axios.get<PostInterface[]>(`${process.env.REACT_APP_API}/talents/${page}`).then((res) => {
      setLoading(false);
      updateTalents(res.data);
    });
  };

  const handleLoadMore = () => {
    const nextPage = ++pageRef.current;
    fetchTalents(nextPage);
  };

  React.useEffect(() => {
    fetchTalents(pageRef.current);
  }, []);

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
      <Search />
      <CategorySelector category="talents" />
      <PostsContainer>
        {state.talents.map((talent: PostInterface) => (
          <Post
            category="talents"
            active={talent.active}
            key={talent.id}
            data={talent}
            handleFavouriteToggle={(e): void => {
              e.stopPropagation();
            }}
          />
        ))}
        <ObsDiv ref={setElement}>{loading && "Loading ..."}</ObsDiv>
      </PostsContainer>
      <DetailsContainer active={active}>
        {state.activeTalent ? <PostDetail data={state.activeTalent} /> : <PostDetailPlaceholder />}
      </DetailsContainer>
    </Main>
  );
};

export default TalentsScreen;
