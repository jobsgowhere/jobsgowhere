import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Auth0Context from "../../contexts/Auth0";
import Button from "../Button";

// Firebase
import * as firebase from "firebase/app";
import "firebase/analytics";

const UserNav: React.FC = function () {
  const auth0Context = useContext(Auth0Context);
  const isAuthenticated = auth0Context?.state.matches("authenticated") ?? false;

  console.log(auth0Context?.state.value);

  const handleLogin = () => {
    auth0Context?.send("LOGIN");
    firebase.analytics().logEvent("Event - LOGIN");
  };
  const handleSignup = () => {
    auth0Context?.send("SIGNUP");
    firebase.analytics().logEvent("Event - SIGNUP");
  };
  const handleLogout = () => {
    auth0Context?.send("LOGOUT");
    firebase.analytics().logEvent("Event - LOGOUT");
  };

  if (isAuthenticated) {
    return (
      <ul>
        <li onClick={() => firebase.analytics().logEvent("Click - New Post")}>
          <Link to="/posts/new">
            <Button secondary>New Post</Button>
          </Link>
        </li>
        <li onClick={() => firebase.analytics().logEvent("Click - Favourites")}>
          <Link to="/favourites">Favourites</Link>
        </li>
        <li onClick={() => firebase.analytics().logEvent("Click - Profile")}>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <a onClick={handleLogout}>
            <Button primary>Sign Out</Button>
          </a>
        </li>
      </ul>
    );
  } else {
    return (
      <ul>
        <li>Already a member?</li>
        <li>
          <a onClick={handleLogin}>
            <Button text>Sign In</Button>
          </a>
        </li>
        <li>
          <a onClick={handleSignup}>
            <Button primary>Sign Up</Button>
          </a>
        </li>
      </ul>
    );
  }
};

export default UserNav;
