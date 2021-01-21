import { useAuth0 } from "@auth0/auth0-react";
import * as React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router";
import styled from "styled-components";

import { useMobileViewContext } from "../contexts/MobileView";
import { useProfile } from "../contexts/Profile";
import { SCREENS } from "../media";
import Footer from "./Footer";
import Header from "./Header/index";
import { MessageDialogContainer } from "./useMessageDialog";
import { ToastContainer } from "./useToast";

const Container = styled.div`
  background-color: var(--color-background);
  display: grid;
  grid-template-rows: 3.5rem auto 0;
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
  const location = useLocation<{ pathname: string }>().pathname;
  const isActive = location.match(/\/(talents|jobs)\/[a-f0-9-]{36}/);
  const { setIsDetailView } = useMobileViewContext();
  setIsDetailView(Boolean(isActive));
  const profileContext = useProfile();
  const { isAuthenticated } = useAuth0();
  if (!profileContext?.profile) {
    if (isAuthenticated) profileContext?.refresh();
  }
  return (
    <Container>
      <Helmet
        defaultTitle={process.env.REACT_APP_WEBSITE_NAME}
        titleTemplate={`%s | ${process.env.REACT_APP_WEBSITE_NAME}`}
      />
      <Header />
      {children}
      <Footer />
      <ToastContainer />
      <MessageDialogContainer />
    </Container>
  );
};

export default Layout;
