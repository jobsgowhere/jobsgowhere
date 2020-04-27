import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "../../components/Button";
import { SCREENS } from "../../media";
import { CategoryTypes } from "../../types";

const Container = styled.div`
  display: flex;
  grid-area: header-right;
  margin-bottom: 1rem;
  * + * {
    margin-left: 0.5rem;
  }
  ${Button} {
    width: 11.5rem;
  }
  ${SCREENS.Down.Tablet} {
    padding: 0 1rem;
  }
`;

type CategorySelectorProps = {
  category: CategoryTypes;
};
const CategorySelector: React.FC<CategorySelectorProps> = function (props) {
  const { category } = props;
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
};

export default CategorySelector;
