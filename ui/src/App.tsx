import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";

import Layout from "./components/Layout";
import { MobileViewProvider } from "./contexts/MobileView";
import Auth0ProviderWithHistory from "./contexts/newAuth0";
import { PostProvider } from "./contexts/Post";
import { ProfileProvider } from "./contexts/Profile";
import { breakpoints, SCREENS } from "./media";
import AboutUsScreen from "./screens/About/AboutUsScreen";
import FAQScreen from "./screens/About/FAQScreen";
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
    <PostProvider>
      <MobileViewProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <BrowserRouter>
            <Auth0ProviderWithHistory>
              <ProfileProvider>
                <Layout>
                  <Switch>
                    <Route exact path="/" component={JobsScreen} />
                    <Route path="/jobs" component={JobsScreen} />
                    <Route path="/talents" component={TalentsScreen} />
                    <Route path="/faq" component={FAQScreen} />
                    <Route path="/about" component={AboutUsScreen} />
                    <ProtectedRoute path="/posts/new" component={PostScreen} />
                    <ProtectedRoute path="/posts/edit" component={PostScreen} />
                    <ProtectedRoute path="/profile" component={ProfileScreen} />
                  </Switch>
                </Layout>
              </ProfileProvider>
            </Auth0ProviderWithHistory>
          </BrowserRouter>
        </ThemeProvider>
      </MobileViewProvider>
    </PostProvider>
  );
};

export default App;
