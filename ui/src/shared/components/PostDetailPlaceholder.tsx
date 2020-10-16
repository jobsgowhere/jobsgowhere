import * as React from "react";
import styled from "styled-components";

import { CategoryTypes } from "../../types";

const Container = styled.div`
  background-color: white;
  border-radius: 0.875rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
`;
const Subtitle = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  text-align: center;
`;

const Quote = styled.p`
  font-size: 0.8rem;
  font-weight: 300;
  text-align: center;
`;

const PostDetailPlaceholder: React.FC<{ type: CategoryTypes }> = function ({ type }) {
  return (
    <Container>
      <Title>Ahh... I see you are looking {type === "jobs" ? "for a job" : "to hire"}</Title>
      <Subtitle>Tap a post on the left</Subtitle>
      <Quote>
        “Every experience in your life is being orchestrated to teach you something you need to know
        to move forward”
        <br />- Brian Tracy
      </Quote>
    </Container>
  );
};

export default PostDetailPlaceholder;
