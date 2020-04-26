import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { SCREENS } from "../../media";
import { FooterLinks } from "../Footer";

type MobileNavProps = {
  active: boolean;
};

const StyledMobileNav = styled.nav<MobileNavProps>`
  background: var(--color-background);
  flex-direction: column;
  width: 100vw;
  display: none;
  padding: 1.5rem 0;
  position: fixed;
  z-index: 1;
  top: 3.5rem;
  bottom: 0;

  ${SCREENS.Down.Tablet} {
    display: ${(props) => (props.active ? "flex" : "none")};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const NavLink = styled(Link)`
  display: block;
  padding: 0.75rem 1.75rem;
  color: var(--color-darkblue);
`;

const Footer = styled.nav`
  margin-top: auto;
`;

const MobileNav: React.FC<MobileNavProps> = function ({ active }) {
  return (
    <StyledMobileNav active={active}>
      <ul>
        <li>
          <NavLink to="#">Profile</NavLink>
        </li>
        <li>
          <NavLink to="#">My Posts</NavLink>
        </li>
        <li>
          <NavLink to="/favourites">My Favourites</NavLink>
        </li>
        <li>
          <NavLink to="#">Log Out</NavLink>
        </li>
      </ul>
      <Footer>
        <FooterLinks />
      </Footer>
    </StyledMobileNav>
  );
};

export default MobileNav;
