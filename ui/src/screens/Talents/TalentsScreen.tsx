import React from "react";
import { RouteProps, Link } from "react-router-dom";
import styled from "styled-components";

import { Main, Col, DetailCol } from "../../components/Main";
import CategorySelector from "../../shared/components/CategorySelector";
import Post from "../../shared/components/Post";
import PostDetail from "../../shared/components/PostDetail";
import PostDetailPlaceholder from "../../shared/components/PostDetailPlaceholder";
import PostsContainer from "../../shared/components/PostsContainer";
import { PostInterface } from "../../types";
import useTalentsReducer from "./hooks/useTalentsReducer";
import { SCREENS } from "../../media";

const DetailsContainer = styled.div`
  flex: 1;

  ${SCREENS.Up.Desktop} {
    .back {
      display: none;
    }
  }
`;

const TalentsScreen: React.FC<RouteProps> = function () {
  const [state] = useTalentsReducer();
  return (
    <Main>
      <Col>
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
      </Col>
      <DetailCol active={Boolean(state.activeTalent)}>
        <CategorySelector category="talents" />
        <DetailsContainer>
          <Link className="back" to="/talents">
            <button>Back</button>
          </Link>
          {state.activeTalent ? (
            <PostDetail data={state.activeTalent} />
          ) : (
            <PostDetailPlaceholder />
          )}
        </DetailsContainer>
      </DetailCol>
    </Main>
  );
};

export default TalentsScreen;
