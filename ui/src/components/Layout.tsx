import * as React from "react";
import styled from "styled-components";

import Footer from "./Footer";
import Header from "./Header";

const Container = styled.div`
  background-color: var(--color-background);
  display: grid;
  grid-template-columns: 100px auto 100px;
  grid-template-rows: 100px auto 100px;
  grid-template-areas:
    "header header header"
    ". main ."
    "footer footer footer";
  min-height: 100vh;
`;

type LayoutProps = {
  children: React.ReactNode;
};
const Layout: React.FC<LayoutProps> = function (props) {
  const { children } = props;
  return (
    <Container>
      <Header />
      {children}
      <Footer />
    </Container>
  );
};

export default Layout;
