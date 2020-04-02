import * as React from "react";
import styled from 'styled-components';

const Container = styled.div`
  grid-area: footer;
`;

type FooterProps = {
};

function Footer(props: FooterProps) {
  return (
    <Container>
      Footer goes here…
    </Container>
  );
}

export default Footer;
