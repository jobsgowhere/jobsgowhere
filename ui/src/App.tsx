import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import Layout from "./components/Layout";
import { Auth0Provider } from "./contexts/Auth0";
import { breakpoints, SCREENS } from "./media";
import AuthorizeScreen from "./screens/Authorize/AuthorizeScreen";
import FavouritesScreen from "./screens/Favourites/FavouritesScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import JobsScreen from "./screens/Jobs/JobsScreen";
import NewPostScreen from "./screens/NewPost/NewPostScreen";
import TalentsScreen from "./screens/Talents/TalentsScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";

const theme = { breakpoints };

const GlobalStyle = createGlobalStyle`
  ${SCREENS.Down.Tablet} {
    body.mobile-scroll-lock {
      overflow: hidden;
    }
  }
`;

const App: React.FC = function () {
  return (
    <Auth0Provider>
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
              <Route path="/profile" component={ProfileScreen} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </ThemeProvider>
    </Auth0Provider>
  );
};

export default App;
