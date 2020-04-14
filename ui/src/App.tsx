import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./components/Layout";
import HomeScreen from "./screens/Home/HomeScreen";
import JobsScreen from "./screens/Jobs/JobsScreen";
import FavouritesScreen from "./screens/Favourites/FavouritesScreen";
import TalentsScreen from "./screens/Talents/TalentsScreen";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/jobs" component={JobsScreen} />
          <Route path="/talents" component={TalentsScreen} />
          <Route path="/favourites" component={FavouritesScreen} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
