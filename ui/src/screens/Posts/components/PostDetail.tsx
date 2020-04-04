import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: white;
  border-radius: 0.875rem;
  padding: 1.5rem;
`;

type PostDetailProps = {
  children: React.ReactNode;
};

function PostDetail(props: PostDetailProps) {
  return <Container>{props.children}</Container>;
}

export default PostDetail;
