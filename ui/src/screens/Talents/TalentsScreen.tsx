import React from "react";

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

const TalentsScreen: React.FC = function () {
  const [state] = useTalentsReducer();
  return (
    <Main>
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
      </PostsContainer>
      <DetailsContainer active={Boolean(state.activeTalent)}>
        {state.activeTalent ? <PostDetail data={state.activeTalent} /> : <PostDetailPlaceholder />}
      </DetailsContainer>
    </Main>
  );
};

export default TalentsScreen;
