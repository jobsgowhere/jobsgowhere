import * as React from "react";
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  grid-area: header;
  display: flex;
  flex-direction: row;
`;

const Left = styled.div`
  flex: 0 0 auto;
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Right = styled.div`
  flex 1 1 auto;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: flex-end;
`;

const Logo = styled.div`
  font-size: 3rem;
`;

const RightItem = styled.div`
  padding: 8px;
`;

type HeaderProps = {
};

function Header(props: HeaderProps) {
  return (
    <Container>
      <Left>
        <Logo>Logo</Logo>
      </Left>
      <Right>
        <RightItem><Link to="/">New Post</Link></RightItem>
        <RightItem><Link to="/">Favourite</Link></RightItem>
        <RightItem><Link to="/">Profile</Link></RightItem>
      </Right>
    </Container>
  );
}

export default Header;
