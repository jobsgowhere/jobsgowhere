import * as React from "react";
import styled from "styled-components";

import { PostInterface } from "../../../interfaces";

const Container = styled.div`
  background-color: white;
  border-radius: 0.875rem;
  padding: 1.5rem;
`;

type PostDetailProps = {
  data?: PostInterface;
};

function PostDetail({ data }: PostDetailProps) {
  if (!data) {
    return <Container>Tap a post on the left</Container>;
  }
  return (
    <Container>
      {data.id}
      <h2>{data.title}</h2>
      <div>{data.description}</div>
    </Container>
  );
}

export default PostDetail;
