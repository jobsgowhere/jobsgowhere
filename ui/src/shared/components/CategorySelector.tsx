import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import Button from "../../components/Button";
import { SCREENS } from "../../media";
import { CategoryTypes } from "../../types";

const Container = styled.div`
  display: flex;
  grid-area: header-right;
  ${SCREENS.Down.Tablet} {
    padding: 0 1rem;
  }
`;

const StyledLink = styled(Link)`
  flex-basis: 11.5rem;
  & + & {
    margin-left: 0.5rem;
  }
  ${Button} {
    width: 100%;
    text-overflow: hidden;
    white-space: nowrap;
  }
`;

type CategorySelectorProps = {
  category: CategoryTypes;
};
const CategorySelector: React.FC<CategorySelectorProps> = function (props) {
  const { category } = props;
  return (
    <Container>
      <StyledLink to="/jobs">
        <Button active={category === "jobs"}>For Job Seekers</Button>
      </StyledLink>
      <StyledLink to="/talents">
        <Button active={category === "talents"}>For Hirers</Button>
      </StyledLink>
    </Container>
  );
};

export default CategorySelector;
