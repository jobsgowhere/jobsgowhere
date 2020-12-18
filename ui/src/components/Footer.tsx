import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { SCREENS } from "../media";

const Container = styled.div`
  grid-area: footer;
  ${SCREENS.Down.Tablet} {
    display: none;
  }
`;

const StyledFooterLinks = styled.ul`
  color: var(--color-grey-300);
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  list-style: none;
  font-size: 0.875rem;
  li:not(:last-child):after {
    content: "·";
    display: inline-block;
    margin: 0 0.3rem;
  }
  a {
    color: currentColor;
    &:hover {
      color: var(--color-blue);
    }
  }
`;

export const FooterLinks: React.FC = function () {
  return (
    <StyledFooterLinks>
      <li>
        <Link to="/faq">FAQ</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <a
          href="https://github.com/jobsgowhere/jobsgowhere"
          target="_blank"
          rel="noreferrer noopener"
        >
          GitHub Repo
        </a>
      </li>
      <li>
        <a href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}>Contact Us</a>
      </li>
    </StyledFooterLinks>
  );
};

const Footer: React.FC = function () {
  return (
    <Container>
      <FooterLinks />
    </Container>
  );
};

export default Footer;
