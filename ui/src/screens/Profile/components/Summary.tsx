import * as React from "react";
import styled from "styled-components";

import Button from "../../../components/Button";
import { FullProfile } from "../../../types";
import ProfileImage from "./ProfileImage";

const StyledSummary = styled.div`
  text-align: center;
  h1 {
    font-size: 1rem;
  }
`;

interface ProfileSummaryProps {
  profile: FullProfile;
  handleEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Summary: React.FC<ProfileSummaryProps> = ({ profile, handleEdit }) => (
  <StyledSummary>
    <ProfileImage src={profile.picture} width="128" height="128" alt="profile image" />
    <h1>
      {profile.firstName} {profile.lastName}
    </h1>
    <p>
      {profile.headline}
      {profile.profileType === "Recruiter" && ` at ${profile.company}`}
    </p>
    <p>{profile.email}</p>
    <Button fullWidth primary onClick={handleEdit}>
      Edit
    </Button>
  </StyledSummary>
);

export default Summary;
