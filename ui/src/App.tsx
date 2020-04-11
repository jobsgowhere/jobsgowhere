import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./components/Layout";
import HomeScreen from "./screens/Home/HomeScreen";
import PostsScreen from "./screens/Posts/PostsScreen";
import FavouriteScreen from "./screens/Favourite/FavouriteScreen";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/:category(jobs|talents)/:id?" component={PostsScreen} />
          <Route path="/favourite" component={FavouriteScreen} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
