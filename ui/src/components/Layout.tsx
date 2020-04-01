import * as React from "react";
import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';

const Container = styled.div`
  background-color: #F1F3F6;
  display: grid;
  grid-template-columns: 100px auto 100px;
  grid-template-rows: 100px auto 100px;
  grid-template-areas:
    "header header header"
    ". main ."
    "footer footer footer";
  min-height: 100vh;
`;

const Main = styled.div`
  grid-area: main;
`;

type LayoutProps = {
  children: React.ReactNode,
};

function Layout(props: LayoutProps) {
  const { children } = props;
  return (
    <Container>
      <Header />
      {children}
      <Footer />
    </Container>
  );
}

export default Layout;
