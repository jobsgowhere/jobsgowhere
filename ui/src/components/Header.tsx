import * as React from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from "./Button"

const Container = styled.div`
  grid-area: header;
  display: flex;
  padding: 2.25rem;
`;

const Left = styled.div`
  flex: 0 0 auto;
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Nav = styled.nav`
  flex 1 1 auto;

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
`;

const Logo = styled.div`
  font-size: 3rem;
`;

type HeaderProps = {
};

function Header(props: HeaderProps) {
  return (
    <Container>
      <Left>
        <Link to="/">
          <Logo>Logo</Logo>
        </Link>
      </Left>
      <Nav>
        <ul>
          <li>Already a member?</li>
          <li><Link to="/"><Button text>Sign In</Button></Link></li>
          <li><Link to="/"><Button primary>Sign Up</Button></Link></li>
          <li><Link to="/"><Button secondary>New Post</Button></Link></li>
          <li><Link to="/favourite">Favourite</Link></li>
          <li><Link to="/">Profile</Link></li>
        </ul>
      </Nav>
    </Container>
  );
}

export default Header;
