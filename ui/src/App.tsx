import * as React from "react";
import { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import Layout from "./components/Layout";
import { Auth0Provider } from "./contexts/Auth0";
import { ProfileProvider } from "./contexts/Profile";
import { breakpoints, SCREENS } from "./media";
import AuthorizeScreen from "./screens/Authorize/AuthorizeScreen";
import FavouritesScreen from "./screens/Favourites/FavouritesScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import JobsScreen from "./screens/Jobs/JobsScreen";
import NewPostScreen from "./screens/NewPost/NewPostScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import TalentsScreen from "./screens/Talents/TalentsScreen";
import ProtectedRoute from "./shared/components/ProtectedRoute";

import useGTM from "@elgorditosalsero/react-gtm-hook";

const theme = { breakpoints };

const GlobalStyle = createGlobalStyle`
  ${SCREENS.Down.Tablet} {
    body.mobile-scroll-lock {
      overflow: hidden;
    }
  }
`;

const App: React.FC = function () {
  /* GTM Initialization */
  const { init } = useGTM();
  useEffect(() => init({ id: process.env.REACT_APP_GTM_ID }), []);

  return (
    <Auth0Provider>
      <ProfileProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <BrowserRouter>
            <Layout>
              <Switch>
                <Route exact path="/" component={HomeScreen} />
                <Route path="/posts/new" component={NewPostScreen} />
                <Route path="/jobs" component={JobsScreen} />
                <Route path="/talents" component={TalentsScreen} />
                <Route path="/favourites" component={FavouritesScreen} />
                <Route path="/auth0/authorize" component={AuthorizeScreen} />
                <ProtectedRoute path="/profile" component={ProfileScreen} />
              </Switch>
            </Layout>
          </BrowserRouter>
        </ThemeProvider>
      </ProfileProvider>
    </Auth0Provider>
  );
};

export default App;
