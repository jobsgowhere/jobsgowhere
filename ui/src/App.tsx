import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import Layout from "./components/Layout";
import { Auth0Provider } from "./contexts/Auth0";
import { MobileViewProvider } from "./contexts/MobileView";
import { PostProvider } from "./contexts/Post";
import { ProfileProvider } from "./contexts/Profile";
import { breakpoints, SCREENS } from "./media";
import AuthorizeScreen from "./screens/Authorize/AuthorizeScreen";
import JobsScreen from "./screens/Jobs/JobsScreen";
import PostScreen from "./screens/Post/NewPostScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import TalentsScreen from "./screens/Talents/TalentsScreen";
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
        <PostProvider>
          <MobileViewProvider>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <BrowserRouter>
                <Layout>
                  <Switch>
                    <Route exact path="/" component={JobsScreen} />
                    <Route path="/auth0/authorize" component={AuthorizeScreen} />
                    <Route path="/jobs" component={JobsScreen} />
                    <Route path="/talents" component={TalentsScreen} />
                    <ProtectedRoute path="/posts/new" component={PostScreen} />
                    <ProtectedRoute path="/posts/edit" component={PostScreen} />
                    <ProtectedRoute path="/profile" component={ProfileScreen} />
                  </Switch>
                </Layout>
              </BrowserRouter>
            </ThemeProvider>
          </MobileViewProvider>
        </PostProvider>
      </ProfileProvider>
    </Auth0Provider>
  );
};

export default App;
