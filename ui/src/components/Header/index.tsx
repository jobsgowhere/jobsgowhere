import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import LogoImg from "../../logo.svg";
import { SCREENS } from "../../media";
import MobileNav from "./MobileNav";
import NavToggle from "./NavToggle";
import UserNav from "./UserNav";

const Container = styled.div`
  outline: 1px solid black;
  outline-offset: -1px;
  grid-area: header;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  background-color: var(--color-background);

  ${SCREENS.Up.Desktop} {
    padding: 0 2.625rem;
  }
`;

const Logo = styled.div`
  img {
    height: 2.3125rem;
  }
  ${SCREENS.Up.Desktop} {
    padding-left: 2.625rem;
    img {
      height: auto;
    }
  }
`;

const Nav = styled.nav`
  margin-left: auto;
  ul {
    margin: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    list-style: none;
  }
  li + li {
    margin-left: 1rem;
  }

  ${SCREENS.Down.Tablet} {
    display: none;
  }
`;

const Header: React.FC = function () {
  const [mobileNavActive, setMobileNavActive] = React.useState(false);
  const toggleNav = function () {
    setMobileNavActive(!mobileNavActive);
  };
  React.useEffect(() => {
    window.document.body.classList.toggle("mobile-scroll-lock", mobileNavActive);
  }, [mobileNavActive]);
  return (
    <>
      <Container>
        <NavToggle onClick={toggleNav} active={mobileNavActive}>
          <i />
          <i />
          <i />
        </NavToggle>
        <Logo>
          <Link to="/">
            <img alt="JobsGoWHere" src={LogoImg} />
          </Link>
        </Logo>
        <Nav>
          <UserNav />
        </Nav>
      </Container>
      <MobileNav active={mobileNavActive} />
    </>
  );
};

export default Header;
