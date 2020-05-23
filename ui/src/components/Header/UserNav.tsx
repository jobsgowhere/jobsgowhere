import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Auth0Context from "../../contexts/Auth0";
import Button from "../Button";

const UserNav: React.FC = function () {
  const auth0Context = useContext(Auth0Context);
  const isAuthenticated = auth0Context?.state.matches("authenticated") ?? false;

  console.log(auth0Context?.state.value);

  const handleSignIn = () => {
    auth0Context?.send("LOGIN");
  };

  if (isAuthenticated) {
    return (
      <ul>
        <li>
          <Link to="/posts/new">
            <Button secondary>New Post</Button>
          </Link>
        </li>
        <li>
          <Link to="/favourites">Favourites</Link>
        </li>
        <li>
          <Link to="/">Profile</Link>
        </li>
      </ul>
    );
  } else {
    return (
      <ul>
        <li>Already a member?</li>
        <li>
          <Button onClick={handleSignIn}>
            <Button text>Sign In</Button>
          </Button>
        </li>
        <li>
          <Link to="/">
            <Button primary>Sign Up</Button>
          </Link>
        </li>
      </ul>
    );
  }
};

export default UserNav;
