import * as React from "react";
import styled from "styled-components";

import { MainSingle } from "../../components/Main";
import Button from "../../components/Button";

const Container = styled.div`
  background: #fff;
  border-radius: 0.875rem;
  align-self: stretch;
  padding: 2rem;
`;

const StyledSummary = styled.div`
  text-align: center;
  h1 {
    font-size: 1rem;
  }
`;

const Summary = () => (
  <StyledSummary>
    <h1>John Oliver</h1>
    <p>Talent hunter at ABCDEF company</p>
    <p>arthur@email.com</p>
    <Button fullWidth primary>
      Edit
    </Button>
  </StyledSummary>
);

const Profile = () => (
  <MainSingle>
    <h1>Profile</h1>
    <Container>
      <Summary />
    </Container>
  </MainSingle>
);

export default Profile;
