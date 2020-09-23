import * as React from "react";
import styled from "styled-components";

import { MainSingle } from "../../components/Main";
import Auth0Context from "../../contexts/Auth0";
import { useProfile } from "../../contexts/Profile";
import Edit from "./components/Edit";
import Summary from "./components/Summary";
import { Auth0Profile } from "../../types";

const Container = styled.div`
  background: #fff;
  border-radius: 0.875rem;
  align-self: stretch;
  padding: 2rem;
`;

const Profile = () => {
  const auth0Context = React.useContext(Auth0Context);
  const profileContext = useProfile();
  const [loading, setLoading] = React.useState(!profileContext?.profile);
  const [editing, setEditing] = React.useState(false);
  const [tempProfile, setTempProfile] = React.useState<Auth0Profile | undefined>();

  React.useEffect(() => {
    if (profileContext?.profile) return;
    profileContext
      ?.refresh()
      .catch((err) => {
        const { status } = err.response;
        if (status === 404) {
          auth0Context?.state.context.client?.getUser().then((res) => {
            if (res) {
              setTempProfile({
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
          auth0Context?.send("LOGOUT");
        }
      })
      .finally(() => setLoading(false));
  }, [profileContext, auth0Context]);

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
