import { useAuth0 } from "@auth0/auth0-react";
import * as React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";

import { MainSingle } from "../../components/Main";
import { useProfile } from "../../contexts/Profile";
import { Auth0Profile } from "../../types";
import Edit from "./components/Edit";
import Summary from "./components/Summary";

const Container = styled.div`
  background: #fff;
  border-radius: 0.875rem;
  align-self: stretch;
  padding: 2rem;
`;

const Profile: React.FC = () => {
  const profileContext = useProfile();
  const [loading, setLoading] = React.useState(!profileContext?.profile);
  const [editing, setEditing] = React.useState(false);
  const [tempProfile, setTempProfile] = React.useState<Auth0Profile | undefined>();

  const { user } = useAuth0();

  React.useEffect(() => {
    if (profileContext?.profile) return;
    profileContext
      ?.refresh()
      .catch((err) => {
        const { status } = err.response;
        if (status === 404) {
          if (user) {
            setTempProfile({
              firstName: user.given_name,
              lastName: user.family_name,
              email: user.email,
              picture: user.picture,
            });
            setEditing(true);
          }
        }
        if (status === 401) {
          user.logout();
        }
      })
      .finally(() => setLoading(false));
  }, [profileContext, user]);

  if (loading)
    return (
      <MainSingle>
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <h1>Profile</h1>
        <Container>
          <div>loading...</div>
        </Container>
      </MainSingle>
    );

  return (
    <MainSingle>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <h1>Profile</h1>
      <Container>
        {profileContext?.profile && !editing && (
          <Summary profile={profileContext.profile} handleEdit={() => setEditing(true)} />
        )}

        {profileContext?.profile && editing && (
          <Edit profile={profileContext.profile} handleCancelEdit={() => setEditing(false)} />
        )}

        {tempProfile && editing && (
          <Edit profile={tempProfile} handleCancelEdit={() => setEditing(false)} newUser />
        )}
      </Container>
    </MainSingle>
  );
};

export default Profile;
