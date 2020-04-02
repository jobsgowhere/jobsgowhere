import * as React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import HomeScreen from './screens/Home/HomeScreen';
import PostsScreen from './screens/Posts/PostsScreen';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/posts" component={PostsScreen} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
