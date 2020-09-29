import * as React from "react";
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
import FAQScreen from "./screens/About/FAQScreen";
import ProtectedRoute from "./shared/components/ProtectedRoute";

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
      <ProfileProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <BrowserRouter>
            <Layout>
              <Switch>
                <Route exact path="/" component={JobsScreen} />
                <Route path="/auth0/authorize" component={AuthorizeScreen} />
                <Route path="/jobs" component={JobsScreen} />
                <Route path="/talents" component={TalentsScreen} />
                <Route path="/about" component={FAQScreen} />
                <ProtectedRoute path="/posts/new" component={NewPostScreen} />
                <ProtectedRoute path="/profile" component={ProfileScreen} />
                <ProtectedRoute path="/favourites" component={FavouritesScreen} />
              </Switch>
            </Layout>
          </BrowserRouter>
        </ThemeProvider>
      </ProfileProvider>
    </Auth0Provider>
  );
};

export default App;
