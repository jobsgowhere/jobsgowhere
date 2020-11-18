import * as React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import { MainSingleLarge } from "../../components/Main";

const Container = styled.div`
  background: #fff;
  border-radius: 0.875rem;
  padding: 2rem;
  color: var(--color-grey-300);
`;

const AboutUsScreen: React.FC = function () {
  return (
    <MainSingleLarge>
      <Helmet>
        <title>About</title>
      </Helmet>
      <h1>The {process.env.REACT_APP_WEBSITE_NAME} Story</h1>
      <Container>
        <p>Hello. Welcome to {process.env.REACT_APP_WEBSITE_NAME}.</p>
        <p>
          We are a group of individuals working on this platform on our free time to bridge the gap
          between job seekers and job providers. We hope this platform is able to help people during
          this time of crisis where many may be unfortunately displaced.
        </p>
        <p>
          If there are any enquiries, please drop the team a message{" "}
          <a href="mailto:jgw@jgw.com">here</a>.
        </p>
      </Container>
    </MainSingleLarge>
  );
};

export default AboutUsScreen;
