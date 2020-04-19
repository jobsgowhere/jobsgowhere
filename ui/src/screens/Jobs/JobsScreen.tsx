import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { Main, Col, DetailCol } from "../../components/Main";
import CategorySelector from "../../shared/components/CategorySelector";
import Post from "../../shared/components/Post";
import PostDetail from "../../shared/components/PostDetail";
import PostDetailPlaceholder from "../../shared/components/PostDetailPlaceholder";
import PostsContainer from "../../shared/components/PostsContainer";
import { SCREENS } from "../../media";

import { CategoryTypes, PostInterface } from "../../types";

import usePostsReducer from "./hooks/useJobsReducer";

const DetailsContainer = styled.div`
  flex: 1;

  ${SCREENS.Up.Desktop} {
    .back {
      display: none;
    }
  }
`;

const JobsScreen: React.FC = function () {
  const [state, actions] = usePostsReducer();
  const { toggleFavouriteJob } = actions;

  return (
    <Main>
      <Col>
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
        </PostsContainer>
      </Col>
      <DetailCol active={Boolean(state.activeJob)}>
        <CategorySelector category="jobs" />
        <DetailsContainer>
          <Link className="back" to="/jobs">
            <button>Back</button>
          </Link>
          {state.activeJob ? <PostDetail data={state.activeJob} /> : <PostDetailPlaceholder />}
        </DetailsContainer>
      </DetailCol>
    </Main>
  );
};

export default JobsScreen;
