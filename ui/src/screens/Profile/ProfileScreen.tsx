import * as React from "react";
import styled from "styled-components";

import { MainSingle } from "../../components/Main";
import Auth0Context from "../../contexts/Auth0";
import JobsGoWhereApiClient from "../../shared/services/JobsGoWhereApiClient";
import Edit from "./components/Edit";
import Summary from "./components/Summary";
import { Auth0Profile, FullProfile } from "./types";

const Container = styled.div`
  background: #fff;
  border-radius: 0.875rem;
  align-self: stretch;
  padding: 2rem;
`;

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
