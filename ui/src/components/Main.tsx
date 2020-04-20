import React from "react";
import styled from "styled-components";

const Col = styled.div`
  max-width: 29.75rem;
  width: 100%;
  & + & {
    margin-left: 1.375rem;
  }
`;

export const StyledMain = styled.div`
  grid-area: main;
  display: flex;
  justify-content: center;
`;

type MainProps = {
  children: React.ReactNode;
};
const Main: React.FC<MainProps> & { Col: typeof Col } = function (props) {
  const { children } = props;
  return <StyledMain>{children}</StyledMain>;
};

Main.Col = Col;

export default Main;
