import * as React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Layout from './components/Layout';
import HomeScreen from './screens/Home/HomeScreen';
import ListingScreen from './screens/Listing/ListingScreen';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/listing" component={ListingScreen} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
