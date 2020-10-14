import { Menu as ReachMenu, MenuButton as ReachMenuButton, MenuPopover } from "@reach/menu-button";
import { positionRight } from "@reach/popover";
import * as React from "react";
import styled from "styled-components";

export const StyledMenuList = styled.div`
  max-width: 12.5rem;
  background: #fff;
  border-radius: 0.875rem;
  padding: 1rem;
  box-shadow: 0 0 1rem rgba(163, 177, 198, 0.25);
  position: relative;
  z-index: 3;
`;

export const StyledMenuItem = styled.button`
  background: transparent;
  border: none;
  display: flex;
  width: 100%;
  cursor: pointer;
  align-items: center;
  white-space: nowrap;
  font-size: 1rem;
  padding: 0;
  line-height: 1.375;
  stroke: var(--color-darkblue);
  color: var(--color-darkblue);

  & + & {
    margin-top: 0.75rem;
  }

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    color: var(--color-blue);
    stroke: var(--color-blue);
  }
`;

const MenuButton = styled(ReachMenuButton)`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  &:focus {
    outline: none;
  }
`;

const OverflowIcon = (
  <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 13a1 1 0 100-2 1 1 0 000 2zM12 6a1 1 0 100-2 1 1 0 000 2zM12 20a1 1 0 100-2 1 1 0 000 2z"
      stroke="#23374D"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type Props = {
  button?: React.ReactNode;
};

export const Menu: React.FC<Props> = ({ button, children }) => {
  const ButtonInner = button || OverflowIcon;
  return (
    <ReachMenu>
      <MenuButton>{ButtonInner}</MenuButton>
      <MenuPopover position={positionRight}>{children}</MenuPopover>
    </ReachMenu>
  );
};
