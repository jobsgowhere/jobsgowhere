import * as React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import Main from "../../components/Main";
import Post from "./components/Post";
import CategorySelector from "./components/CategorySelector";
import PostDetail from "./components/PostDetail";

import { PostInterface, CategoryTypes } from "../../types";

import usePostsReducer from "./hooks/usePostsReducer";
import PostDetailPlaceholder from "./components/PostDetailPlaceholder";

const ListContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const DetailsContainer = styled.div`
  flex: 1;
`;

type PostsScreenProps = {};

function PostsScreen(): React.ReactElement {
  const [state, actions] = usePostsReducer();
  const { toggleFavouriteJob } = actions;
  const { category: categoryString } = useParams<{ category: string }>();
  const category = categoryString as CategoryTypes;

  return (
    <Main>
      <Main.Col>
        <ListContainer>
          {state[category].map((post: PostInterface) => (
            <Post
              category={category}
              active={post.active}
              key={post.id}
              data={post}
              handleFavouriteToggle={(e): void => {
                e.stopPropagation();
                toggleFavouriteJob(post);
              }}
            />
          ))}
        </ListContainer>
      </Main.Col>
      <Main.Col>
        <CategorySelector category={category} />
        <DetailsContainer>
          {state.activePost ? <PostDetail data={state.activePost} /> : <PostDetailPlaceholder />}
        </DetailsContainer>
      </Main.Col>
    </Main>
  );
}

export default PostsScreen;
