import * as React from "react";
import styled from "styled-components";

import { SCREENS } from "../../media";

const Container = styled.div`
  grid-area: header-left;
  ${SCREENS.Down.Tablet} {
    padding: 0 1rem;
  }
`;

const StyledSearch = styled.input`
  border-radius: 0.875rem;
  background: #fff;
  box-shadow: none;
  border: none;
  height: 100%;
  width: 100%;
`;

const Search: React.FC = function () {
  return (
    <Container>
      <StyledSearch placeholder="Search job postings" />
    </Container>
  );
};

export default Search;
