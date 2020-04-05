import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Button from "../../components/Button";
import Main from "../../components/Main";

type HomeScreenProps = {};

function HomeScreen(props: HomeScreenProps) {
  return (
    <Main>
      <Main.Col>
        <div>
          <Link to="/posts">
            <Button primary>Go to jobs board</Button>
          </Link>
        </div>
      </Main.Col>
      <Main.Col>
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
        </div>
      </Main.Col>
    </Main>
  );
}

export default HomeScreen;
