import React from "react";
import styled from "styled-components";

import { SCREENS } from "../../media";

const Container = styled.div`
  grid-area: list;
  ${SCREENS.Down.Tablet} {
    padding: 0 1rem;
  }
`;

type PostsContainerProps = {
  children: React.ReactNode;
};
const PostsContainer: React.FC<PostsContainerProps> = function (props) {
  const { children } = props;
  return <Container>{children}</Container>;
};

export default PostsContainer;
