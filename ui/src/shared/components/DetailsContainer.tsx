import * as React from "react";
import styled from "styled-components";

import { SCREENS } from "../../media";
import { useAppContext } from "../../shared/components/AppContext";

type DetailsContainerProps = {
  active?: boolean;
  onClick?(): void;
  children: React.ReactNode;
};

const StyledDetailsContainer = styled.div<{ active?: boolean; yOffset: number }>`
  align-self: flex-start;
  grid-area: detail;
  position: sticky;
  top: 1rem;

  ${SCREENS.Down.Tablet} {
    width: 100%;
    padding: 0 1rem;
    position: absolute;
    top: ${(props) => props.yOffset}px;
  }
`;

const DetailsContainer: React.FC<DetailsContainerProps> = function ({ active, onClick, children }) {
  const [yOffset, setYOffset] = React.useState(0);
  React.useLayoutEffect(() => {
    setYOffset(window.scrollY);
    window.document.body.classList.toggle("mobile-scroll-lock", active);
  }, [active]);
  return (
    <StyledDetailsContainer onClick={onClick} active={active} yOffset={yOffset}>
      {children}
    </StyledDetailsContainer>
  );
};

export default DetailsContainer;
