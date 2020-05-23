import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Auth0Context from "../../contexts/Auth0";
import Button from "../Button";

const UserNav: React.FC = function () {
  const auth0Context = useContext(Auth0Context);
  const isAuthenticated = auth0Context?.state.matches("authenticated") ?? false;

  if (isAuthenticated) {
    return (
      <ul>
        <li>Already a member?</li>
        <li>
          <Link to="/">
            <Button text>Sign In</Button>
          </Link>
        </li>
        <li>
          <Link to="/">
            <Button primary>Sign Up</Button>
          </Link>
        </li>
      </ul>
    );
  } else {
    return (
      <ul>
        <li>Already a member?</li>
        <li>
          <Link to="/">
            <Button text>Sign In</Button>
          </Link>
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
