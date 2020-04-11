import React from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import Button from "../../../components/Button";

const Container = styled.div`
  display: flex;
  * + * {
    margin-left: 0.5rem;
  }
  ${Button} {
    width: 11.5rem;
  }
`;

function CategorySelector(): React.ReactElement {
  const { category } = useParams<{ category: string }>();
  return (
    <Container>
      <Link to="/jobs">
        <Button active={category === "jobs"}>For Job Seekers</Button>
      </Link>
      <Link to="/talents">
        <Button active={category === "talents"}>For Hirers</Button>
      </Link>
    </Container>
  );
}

export default CategorySelector;
