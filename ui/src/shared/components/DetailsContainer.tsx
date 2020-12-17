import * as React from "react";
import styled from "styled-components";

import { SCREENS } from "../../media";

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
    padding: 0 1rem 1rem;
    position: absolute;
    top: ${(props) => props.yOffset}px;
    overflow-y: auto;
    /* "3.5rem" below should match height of header in Layout.tsx  */
    height: min(100%, 100vh - 3.5rem);
  }
`;

const DetailsContainer: React.FC<DetailsContainerProps> = function ({ active, onClick, children }) {
  const [yOffset, setYOffset] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);
  React.useLayoutEffect(() => {
    setYOffset(window.scrollY);
    window.document.body.classList.toggle("mobile-scroll-lock", active);
    // Ensure container scroll position is reset to top when Detail is opened
    active && ref.current && ref.current.scrollTo(0, 0);
  }, [active]);
  return (
    <StyledDetailsContainer ref={ref} onClick={onClick} active={active} yOffset={yOffset}>
      {children}
    </StyledDetailsContainer>
  );
};

export default DetailsContainer;
