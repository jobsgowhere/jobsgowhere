import * as React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {createGlobalStyle, ThemeProvider} from "styled-components";

import {breakpoints, SCREENS} from "./media";
import Layout from "./components/Layout";
import FavouritesScreen from "./screens/Favourites/FavouritesScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import JobsScreen from "./screens/Jobs/JobsScreen";
import NewPostScreen from "./screens/NewPost/NewPostScreen";
import TalentsScreen from "./screens/Talents/TalentsScreen";
import NavBar from "./components/NavBar";
import {useAuth0} from "./react-auth0-spa";

const theme = {breakpoints};

const GlobalStyle = createGlobalStyle`
  ${SCREENS.Down.Tablet} {
    body.mobile-scroll-lock {
      overflow: hidden;
    }
  }
`;

const App: React.FC = function () {
    const loading = useAuth0();
    if (loading) {
        return <div>Loading...</div>;
    }
    return (

        <div className="App">
            <header>
                <NavBar/>
            </header>
            <ThemeProvider theme={theme}>
                <GlobalStyle/>
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={HomeScreen}/>
                            <Route path="/posts/new" component={NewPostScreen}/>
                            <Route path="/jobs" component={JobsScreen}/>
                            <Route path="/talents" component={TalentsScreen}/>
                            <Route path="/favourites" component={FavouritesScreen}/>
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </ThemeProvider>
        </div>
    );
};

export default App;