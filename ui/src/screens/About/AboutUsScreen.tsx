import * as React from "react";
import styled from "styled-components";

const MainSingle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-area: main;
  max-width: 735px; 
  width: 100%;
  margin: 0 auto;
  font-family: 'Nunito';
  font-size: 18px;
  font-weight: 400;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  text-align: center;
`;

const Container = styled.div`
  background: #fff;
  border-radius: 0.875rem;
  align-self: stretch;
  padding: 1rem;
`;

const AboutUsScreen: React.FC = function () {
  return (
    <MainSingle>
      <Title>The JobsGoWhere Story</Title>
      <Container> 
        Hello. Welcome to JobsGoWhere.
        <p />
        We are a group of individuals working on this platform on our free time to bridge the gap between job seekers and
        job providers. We hope this platform is able to help people during this time of crisis where many may be unfortunately displaced.
        <p />
        If there are any enquiries, please drop the team a message <a href="mailto:jgw@jgw.com">here</a>.

      </Container>
    </MainSingle>
  );
};

export default AboutUsScreen;
