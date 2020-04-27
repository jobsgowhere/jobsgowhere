import styled, { css } from "styled-components";

import { SCREENS } from "../../media";

type NavToggleProps = {
  active: boolean;
  onClick: () => void;
};

const NavToggle = styled.button<NavToggleProps>`
  width: 3.5rem;
  height: 3.5rem;
  padding: 0;
  position: absolute;
  left: 0;
  background: transparent;
  border: none;

  i {
    position: absolute;
    width: 1.25rem;
    height: 0.125rem;
    background-color: #000;
    top: 50%;
    left: 50%;
    margin-left: -0.5625rem;
  }
  i:nth-child(1) {
    transform: translateY(-0.375rem);
  }
  i:nth-child(3) {
    transform: translateY(0.375rem);
  }

  ${SCREENS.Up.Desktop} {
    display: none;
  }

  ${(props) =>
    props.active &&
    css`
      i:nth-child(1) {
        transform: translate(0) rotateZ(45deg);
      }
      i:nth-child(2) {
        display: none;
      }
      i:nth-child(3) {
        transform: translate(0) rotateZ(-45deg);
      }
    `}
`;

export default NavToggle;
