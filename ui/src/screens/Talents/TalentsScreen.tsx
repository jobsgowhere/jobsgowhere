import React from "react";
import { RouteProps } from "react-router";
import styled from "styled-components";

import Main from "../../components/Main";
import useTalentsReducer from "./hooks/useTalentsReducer";
import { PostInterface } from "../../types";
import Post from '../../shared/components/Post';
import CategorySelector from "../../shared/components/CategorySelector";
import PostDetail from "../../shared/components/PostDetail";
import PostDetailPlaceholder from "../../shared/components/PostDetailPlaceholder";

const ListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const DetailsContainer = styled.div`
  flex: 1;
`;

const TalentsScreen: React.FC<RouteProps> = function() {
  const [state] = useTalentsReducer();
  return (
    <Main>
      <Main.Col>
        <ListContainer>
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
        </ListContainer>
      </Main.Col>
      <Main.Col>
        <CategorySelector category="talents" />
        <DetailsContainer>
          {state.activeTalent ? <PostDetail data={state.activeTalent} /> : <PostDetailPlaceholder />}
        </DetailsContainer>
      </Main.Col>
    </Main>
  );
}

export default TalentsScreen;
