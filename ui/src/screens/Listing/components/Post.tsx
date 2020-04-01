import * as React from "react";
import styled from 'styled-components';

const Container = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  min-height: 100px;
  margin: 5px;
`;

const Avatar = styled.div`
  flex: 0 0 auto;
  width: 100px;
  background-color: red;
`;

const Info = styled.div`
  flex: auto;
  background-color: green;
`;

const Actions = styled.div`
  flex: 0 0 auto;
  width: 100px;
  background-color: blue;
`;

type PostProps = {};

function Post(props: PostProps) {
  return (
    <Container>
      <Avatar />
      <Info />
      <Actions />
    </Container>
  );
}

export default Post;
