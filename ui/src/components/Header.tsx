import * as React from "react";
import styled from 'styled-components';

const Container = styled.div`
  grid-area: header;
`;

type HeaderProps = {
};

function Header(props: HeaderProps) {
  return (
    <Container>
      Header goes here…
    </Container>
  );
}

export default Header;
