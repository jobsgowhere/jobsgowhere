import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Auth0Context from "../../contexts/Auth0";
import Button from "../Button";

const UserNav: React.FC = function () {
  const auth0Context = useContext(Auth0Context);
  const isAuthenticated = auth0Context?.state.matches("authenticated") ?? false;

  console.log(auth0Context?.state.value);

  const handleLogin = () => {
    auth0Context?.send("LOGIN");
  };
  const handleLogout = () => {
    auth0Context?.send("LOGOUT");
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
      <a onClick={handleLogin}>
        <Button primary>Sign In</Button>
      </a>
    );
  }
};

export default UserNav;
