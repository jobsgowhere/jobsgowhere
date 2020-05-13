import * as React from "react";
import { Link } from "react-router-dom";

import Button from "../../components/Button";
import { MainSingle } from "../../components/Main";

const HomeScreen: React.FC = function () {
  return (
    <MainSingle>
      <p>
        <Link to="/jobs">
          <Button primary>Go to jobs board</Button>
        </Link>
      </p>
      <p>
        <Link to="/talents">
          <Button primary>Go to talents board</Button>
        </Link>
      </p>
      <p>
        <Link to="/favourites">
          <Button secondary>Favourites</Button>
        </Link>
      </p>
      <div>
        <h2>Buttons</h2>
        <p>
          <Button>Default Button</Button>
        </p>
        <p>
          <Button primary>Primary Button</Button>
        </p>
        <p>
          <Button secondary>Secondary Button</Button>
        </p>
        <p>
          <Button active>Active Button</Button>
        </p>
        <p style={{ width: "400px" }}>
          <Button fullWidth>Fullwidth Button</Button>
        </p>
      </div>
    </MainSingle>
  );
};

export default HomeScreen;
