import React from "react";
import styled from "styled-components";

type PostsContainerProps = {
  children: React.ReactNode;
};

const PostBlock = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

const PostsContainer: React.FC<PostsContainerProps> = function ({ children }) {
  return (
    <div>
      {React.Children.map(children, (post) => (
        <PostBlock>{post}</PostBlock>
      ))}
    </div>
  );
};

export default PostsContainer;
