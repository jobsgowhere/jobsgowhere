import React from "react";
import styled from "styled-components";

import { SCREENS } from "../../media";

const Container = styled.div`
  grid-area: list;
  ${SCREENS.Down.Tablet} {
    padding: 0 1rem;
  }
`;

const PostBlock = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

type PostsContainerProps = {
  children: React.ReactNode;
};
const PostsContainer: React.FC<PostsContainerProps> = function (props) {
  const { children } = props;
  return (
    <Container>
      {React.Children.map(children, (post) => (
        <PostBlock>{post}</PostBlock>
      ))}
    </Container>
  );
};

export default PostsContainer;
