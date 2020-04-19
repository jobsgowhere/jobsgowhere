import * as React from "react";
import styled, { css } from "styled-components";

import { up, down } from "styled-breakpoints";
import { SCREENS } from "../media";

export const Col = styled.div`
  width: 100%;

  ${SCREENS.Up.Desktop} {
    max-width: 29.75rem;
    & + & {
      margin-left: 1.375rem;
    }
  }
`;

type DetailColProps = {
  active?: boolean;
  onClick?(): void;
};

export const DetailCol = styled(Col)<DetailColProps>`
  ${SCREENS.Down.Tablet} {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding: 20px;
    background: rgba(0, 0, 0, 0.2);
    display: ${(props) => (props.active ? "block" : "none")};
  }
`;

export const StyledMain = styled.div`
  grid-area: main;
  padding: 0 1rem;

  ${SCREENS.Up.Desktop} {
    display: flex;
    justify-content: center;
  }
`;

type MainProps = {
  children: React.ReactNode;
};

export const Main: React.FC<MainProps> = function (props) {
  const { children } = props;
  return <StyledMain>{children}</StyledMain>;
};
