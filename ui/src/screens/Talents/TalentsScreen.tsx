import React from "react";
import { RouteProps } from "react-router";
import styled from "styled-components";

import Main from "../../components/Main";
import CategorySelector from "../../shared/components/CategorySelector";
import Post from "../../shared/components/Post";
import PostDetail from "../../shared/components/PostDetail";
import PostDetailPlaceholder from "../../shared/components/PostDetailPlaceholder";
import PostsContainer from "../../shared/components/PostsContainer";
import { PostInterface } from "../../types";
import useTalentsReducer from "./hooks/useTalentsReducer";

const DetailsContainer = styled.div`
  flex: 1;
`;

const TalentsScreen: React.FC<RouteProps> = function () {
  const [state] = useTalentsReducer();
  return (
    <Main>
      <Main.Col>
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
      </Main.Col>
      <Main.Col>
        <CategorySelector category="talents" />
        <DetailsContainer>
          {state.activeTalent ? (
            <PostDetail data={state.activeTalent} />
          ) : (
            <PostDetailPlaceholder />
          )}
        </DetailsContainer>
      </Main.Col>
    </Main>
  );
};

export default TalentsScreen;
