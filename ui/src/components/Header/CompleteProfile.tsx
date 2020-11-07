import * as React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 0.5rem;
  }
`;

const CompleteProfile = () => (
  <Container>
    <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0v0zM12 9v4M12 17h.01"
        stroke="#F66D6D"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    Complete your Profile
  </Container>
);

export default CompleteProfile;
