import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  grid-area: footer;
  color: var(--color-grey-300);

  ul {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
    list-style: none;
    font-size: 0.875rem;
  }
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

type FooterProps = {};

function Footer(props: FooterProps) {
  return (
    <Container>
      <ul>
        <li>
          <a href="/">About</a>
        </li>
        <li>
          <a href="/">Privacy</a>
        </li>
        <li>
          <a href="/">Terms</a>
        </li>
        <li>
          <a
            href="https://github.com/jobsgowhere/jobsgowhere"
            target="_blank"
            rel="noreferrer noopener"
          >
            Github Repo
          </a>
        </li>
        <li>
          <a href="/">Contact Us</a>
        </li>
      </ul>
    </Container>
  );
}

export default Footer;
