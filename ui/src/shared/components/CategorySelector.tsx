import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "../../components/Button";
import { CategoryTypes } from "../../types";

const Container = styled.div`
  display: flex;
  margin-bottom: 1rem;
  * + * {
    margin-left: 0.5rem;
  }
  ${Button} {
    width: 11.5rem;
  }
`;

type CategorySelectorProps = {
  category: CategoryTypes;
};

function CategorySelector({ category }: CategorySelectorProps): React.ReactElement {
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
