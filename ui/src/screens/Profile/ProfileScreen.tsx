import * as React from "react";
import styled from "styled-components";

import Button from "../../components/Button";
import { Fieldset, Hint, Label, Radio, TextInput } from "../../components/FormFields";
import { MainSingle } from "../../components/Main";
import Auth0Context from "../../contexts/Auth0";
import JobsGoWhereApiClient from "../../shared/services/JobsGoWhereApiClient";

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

const RadiosHolder = styled.div`
  display: flex;
  align-items: center;
  .radio-item + .radio-item {
    margin-left: 2rem;
  }
`;

const ProfileImage = styled.img`
  width: 8rem;
  height: 8rem;
  margin: 0 auto 1rem;
  border-radius: 100%;
`;

const RECRUITER = "Recruiter";
const SEEKER = "Seeker";

interface Auth0Profile {
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
}

interface FullProfile extends Auth0Profile {
  profileType: "Recruiter" | "Seeker";
  headline: string;
  website: string;
  company?: string;
}

interface ProfileEditProps {
  profile: Auth0Profile | FullProfile;
  handleCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Edit: React.FC<ProfileEditProps> = ({ profile, handleCancel }) => {
  const { firstName, lastName, email, picture } = profile;

  const profileType = ("profileType" in profile && profile.profileType) || RECRUITER;
  const headline = ("headline" in profile && profile.headline) || "";
  const company = ("company" in profile && profile.company) || "";
  const website = ("website" in profile && profile.website) || "";

  const [selectedProfileType, setSelectedProfileType] = React.useState(profileType);
  return (
    <form>
      <Fieldset>
        <ProfileImage src={picture} width="128" height="128" alt="profile image" />
      </Fieldset>
      <TwoCol>
        <Col>
          <Fieldset>
            <Label htmlFor="first-name">First Name</Label>
            <TextInput id="first-name" name="first_name" defaultValue={firstName} />
          </Fieldset>
        </Col>
        <Col>
          <Fieldset>
            <Label htmlFor="last-name">Last Name</Label>
            <TextInput id="last-name" name="last_name" defaultValue={lastName} />
          </Fieldset>
        </Col>
      </TwoCol>
      <Fieldset name="profile-type">
        <Label htmlFor="profile-type">Profile Type</Label>
        <RadiosHolder>
          <div className="radio-item">
            <Radio
              value={RECRUITER}
              name="profile_type"
              defaultChecked={profileType === RECRUITER}
              onChange={() => {
                setSelectedProfileType(RECRUITER);
              }}
            >
              I&apos;m Hiring
            </Radio>
          </div>
          <div className="radio-item">
            <Radio
              value={SEEKER}
              name="profile_type"
              defaultChecked={profileType === SEEKER}
              onChange={() => {
                setSelectedProfileType(SEEKER);
              }}
            >
              I&apos;m Seeking
            </Radio>
          </div>
        </RadiosHolder>
      </Fieldset>
      {selectedProfileType === RECRUITER && (
        <>
          <Fieldset>
            <Label htmlFor="job-title">Job Title</Label>
            <TextInput id="job-title" name="headline" defaultValue={headline} />
          </Fieldset>
          <Fieldset>
            <Label htmlFor="company">Company</Label>
            <TextInput id="company" name="company" defaultValue={company} />
          </Fieldset>
          <Fieldset>
            <Label htmlFor="company-website">Company Website</Label>
            <TextInput id="company-website" name="website" defaultValue={website} />
            <Hint>
              Include a company link for potential candiates to learn more about your company
            </Hint>
          </Fieldset>
        </>
      )}
      {selectedProfileType === SEEKER && (
        <>
          <Fieldset>
            <Label htmlFor="headline">Headline</Label>
            <TextInput id="headline" name="headline" defaultValue={headline} />
            <Hint>Give a headline of what you want others to see you as.</Hint>
          </Fieldset>
          <Fieldset>
            <Label htmlFor="seeker-website">Website / Portfolio / Github</Label>
            <TextInput id="seeker-website" name="website" defaultValue={website} />
            <Hint>Include a link for potential companies to learn more about you.</Hint>
          </Fieldset>
        </>
      )}
      <Fieldset>
        <Label htmlFor="email">Email</Label>
        <TextInput id="email" name="email" defaultValue={email} />
        <Hint>This is for the emails you will receive when you connect with someone.</Hint>
      </Fieldset>
      <TwoCol>
        <Col>
          <Button onClick={handleCancel} fullWidth>
            Cancel
          </Button>
        </Col>
        <Col>
          <Button fullWidth secondary primary>
            Save
          </Button>
        </Col>
      </TwoCol>
    </form>
  );
};

interface ProfileSummaryProps {
  profile: FullProfile;
  handleEdit: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Summary: React.FC<ProfileSummaryProps> = ({ profile, handleEdit }) => (
  <StyledSummary>
    <h1>
      {profile.firstName} {profile.lastName}
    </h1>
    <p>{profile.headline}</p>
    <p>{profile.email}</p>
    <Button fullWidth primary onClick={handleEdit}>
      Edit
    </Button>
  </StyledSummary>
);

const Profile = () => {
  const ctx = React.useContext(Auth0Context);
  const [loading, setLoading] = React.useState(true);
  const [editing, setEditing] = React.useState(false);
  const [profileData, setProfileData] = React.useState<FullProfile | undefined>();
  const [auth0ProfileData, setAuth0ProfileData] = React.useState<Auth0Profile | undefined>();

  React.useEffect(() => {
    JobsGoWhereApiClient.get(`${process.env.REACT_APP_API}/profile`)
      .then((res) => {
        const {
          first_name: firstName,
          last_name: lastName,
          avatar_url: picture,
          profile_type: profileType,
          email,
          headline,
          company,
          website,
        } = res.data;
        setProfileData({
          firstName,
          lastName,
          picture,
          profileType,
          email,
          headline,
          company,
          website,
        });
      })
      .catch((err) => {
        const { status } = err.response;
        if (status === 404) {
          ctx?.state.context.client?.getUser().then((res) => {
            if (res) {
              console.log(res);
              setAuth0ProfileData({
                firstName: res.given_name,
                lastName: res.family_name,
                email: res.email,
                picture: res.picture,
              });
              setEditing(true);
            }
          });
        }
        if (status === 401) {
          ctx?.send("LOGOUT");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <MainSingle>
        <Container>
          <h1>Profile</h1>
          <div>loading...</div>
        </Container>
      </MainSingle>
    );

  return (
    <MainSingle>
      <Container>
        <h1>Profile</h1>

        {profileData && !editing && (
          <Summary profile={profileData} handleEdit={() => setEditing(true)} />
        )}

        {auth0ProfileData && editing && (
          <Edit profile={auth0ProfileData} handleCancel={() => setEditing(false)} />
        )}

        {profileData && editing && (
          <Edit profile={profileData} handleCancel={() => setEditing(false)} />
        )}
      </Container>
    </MainSingle>
  );
};

export default Profile;
