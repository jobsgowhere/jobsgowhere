import * as React from "react";
import styled from "styled-components";

import { MainSingle } from "../../components/Main";
import Button from "../../components/Button";
import { Fieldset, Label, TextInput, Hint } from "../../components/FormFields";

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

const TwoCol = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Col = styled.div`
  flex: 1;
  & + & {
    margin-left: 0.875rem;
  }
`;

const Edit = () => {
  const [profileType, setProfileType] = React.useState("hiring");
  return (
    <>
      <TwoCol>
        <Col>
          <Fieldset>
            <Label htmlFor="first-name">First Name</Label>
            <TextInput id="first-name" name="first-name" />
          </Fieldset>
        </Col>
        <Col>
          <Fieldset>
            <Label htmlFor="last-name">Last Name</Label>
            <TextInput id="last-name" name="last-name" />
          </Fieldset>
        </Col>
      </TwoCol>
      <Fieldset name="profile-type">
        <Label htmlFor="profile-type">Profile Type</Label>
        <label>
          <input
            checked={profileType === "hiring"}
            onChange={() => setProfileType("hiring")}
            name="profile-type"
            value="hiring"
            type="radio"
          />
          I'm Hiring
        </label>
        <label>
          <input
            checked={profileType === "seeking"}
            onChange={() => setProfileType("seeking")}
            name="profile-type"
            value="seeking"
            type="radio"
          />
          I'm Seeking
        </label>
      </Fieldset>
      {profileType === "hiring" ? (
        <>
          <Fieldset>
            <Label htmlFor="job-title">Job Title</Label>
            <TextInput id="job-title" name="job-title" />
          </Fieldset>
          <Fieldset>
            <Label htmlFor="company">Company</Label>
            <TextInput id="company" name="company" />
          </Fieldset>
          <Fieldset>
            <Label htmlFor="company-website">Company Website</Label>
            <TextInput id="company-website" name="company-website" />
            <Hint>
              Include a company link for potential candiates to learn more about your company
            </Hint>
          </Fieldset>
        </>
      ) : null}
      {profileType === "seeking" ? (
        <>
          <Fieldset>
            <Label htmlFor="headline">Headline</Label>
            <TextInput id="headline" name="headline" />
            <Hint>Give a headline of what you want others to see you as.</Hint>
          </Fieldset>
          <Fieldset>
            <Label htmlFor="company">Website / Portfolio / Github</Label>
            <TextInput id="company" name="company" />
            <Hint>Include a link for potential companies to learn more about you.</Hint>
          </Fieldset>
        </>
      ) : null}
      <Fieldset>
        <Label htmlFor="email">Email</Label>
        <TextInput id="email" name="email" />
        <Hint>This is for the emails you will receive when you connect with someone.</Hint>
      </Fieldset>
      <TwoCol>
        <Col>
          <Button fullWidth>Cancel</Button>
        </Col>
        <Col>
          <Button fullWidth secondary primary>
            Save
          </Button>
        </Col>
      </TwoCol>
    </>
  );
};

const Profile = () => {
  const [editing, setEditing] = React.useState(false);

  const Summary = () => (
    <StyledSummary>
      <h1>John Oliver</h1>
      <p>Talent hunter at ABCDEF company</p>
      <p>arthur@email.com</p>
      <Button fullWidth primary onClick={() => setEditing(true)}>
        Edit
      </Button>
    </StyledSummary>
  );

  return (
    <MainSingle>
      <h1>Profile</h1>
      <Container>{editing ? <Edit /> : <Summary />}</Container>
    </MainSingle>
  );
};

export default Profile;
