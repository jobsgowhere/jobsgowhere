import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { breakpoints } from "./media";
import Layout from "./components/Layout";
import FavouritesScreen from "./screens/Favourites/FavouritesScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import JobsScreen from "./screens/Jobs/JobsScreen";
import NewPostScreen from "./screens/NewPost/NewPostScreen";
import TalentsScreen from "./screens/Talents/TalentsScreen";

const theme = { breakpoints };

const App: React.FC = function () {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={HomeScreen} />
            <Route path="/posts/new" component={NewPostScreen} />
            <Route path="/jobs" component={JobsScreen} />
            <Route path="/talents" component={TalentsScreen} />
            <Route path="/favourites" component={FavouritesScreen} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
