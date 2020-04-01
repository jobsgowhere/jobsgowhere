import * as React from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  grid-area: header;
`;

type HeaderProps = {
};

function Header(props: HeaderProps) {
  return (
    <Container>
      Header goes here… <Link to="/">Go Home</Link>
    </Container>
  );
}

export default Header;
