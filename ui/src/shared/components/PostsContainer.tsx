import React from "react";
import styled from "styled-components";

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
    <div>
      {React.Children.map(children, (post) => (
        <PostBlock>{post}</PostBlock>
      ))}
    </div>
  );
};

export default PostsContainer;
