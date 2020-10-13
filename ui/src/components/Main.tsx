import styled, { css } from "styled-components";

import { SCREENS } from "../media";

type MainProps = {
  active?: boolean;
};

export const Main = styled.div<MainProps>`
  grid-area: main;
  display: grid;
  grid-template-columns: 100vw 100vw;
  grid-template-rows: 2.875rem 2.875rem auto;
  grid-row-gap: 1rem;
  transition: transform 200ms ease-in-out;
  position: relative;

  grid-template-areas:
    "header-left detail"
    "header-right detail"
    "list detail";

  ${SCREENS.Down.Tablet} {
    ${(props) =>
      props.active &&
      css`
        transform: translateX(-100vw);
      `}
  }

  ${SCREENS.Up.Desktop} {
    padding: 0 1rem;
    justify-content: center;
    grid-template-rows: 2.875rem auto;
    grid-template-columns: repeat(2, 29.75rem);
    grid-column-gap: 1.375rem;
    grid-row-gap: 1.375rem;
    grid-template-areas:
      "header-left header-right"
      "list detail";
  }
`;

export const MainSingle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-area: main;
  max-width: 30rem;
  width: 100%;
  margin: 0 auto;
`;
