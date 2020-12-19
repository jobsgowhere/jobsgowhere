import * as React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { SCREENS } from "../../media";

const BackLink = styled.a`
  width: 3.5rem;
  height: 3.5rem;
  padding: 0;
  position: absolute;
  left: 0;
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  ${SCREENS.Up.Desktop} {
    display: none;
  }
`;

const NavBack = () => {
  const history = useHistory();
  const split = history.location.pathname.split("/");
  split.pop();
  return (
    <BackLink
      onClick={() => {
        window.setTimeout(() => {
          history.push(split.join("/"));
        }, 150);
      }}
    >
      <svg width="8" height="14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.707.293a1 1 0 010 1.414L2.414 7l5.293 5.293a1 1 0 11-1.414 1.414l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 0z"
          fill="#000"
        />
      </svg>
    </BackLink>
  );
};

export default NavBack;
