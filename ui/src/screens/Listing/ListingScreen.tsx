import * as React from "react";
import styled from 'styled-components';

import Main from '../../components/Main';

const Container = styled(Main)`
  display: flex;
`;

type ListingScreenProps = {};

function ListingScreen(props: ListingScreenProps) {
  return (
    <Container>
      Listing 1, 2, 3
    </Container>
  );
}

export default ListingScreen;
