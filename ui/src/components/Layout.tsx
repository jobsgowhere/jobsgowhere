import * as React from "react";
import styled from "styled-components";

import { SCREENS } from "../media";
import Footer from "./Footer";
import Header from "./Header/index";
import { ToastContainer } from "./useToast";
import { MessageDialogContainer } from "./useMessageDialog";

const Container = styled.div`
  background-color: var(--color-background);
  display: grid;
  grid-template-rows: 3.5rem auto 100px;
  grid-template-columns: 100vw;
  grid-template-areas:
    "header"
    "main"
    "footer";
  min-height: 100vh;

  ${SCREENS.Down.Tablet} {
    overflow: hidden;
  }
  ${SCREENS.Up.Desktop} {
    grid-template-rows: 7.125rem auto 100px;
  }
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
      <ToastContainer />
      <MessageDialogContainer />
    </Container>
  );
};

export default Layout;
