import React from "react";

import { FullProfile } from "../types";
import ApiClient from "../shared/services/ApiClient";

export interface ProfileContextValue {
  profile: FullProfile | null;
  setProfile: React.Dispatch<FullProfile>;
  refresh: () => Promise<FullProfile>;
}

const ProfileContext = React.createContext<ProfileContextValue | undefined>(undefined);

export const ProfileProvider: React.FC = function (props) {
  const { children } = props;
  const [profile, setProfile] = React.useState<FullProfile | null>(null);

  const refresh = () => {
    return ApiClient.get(`${process.env.REACT_APP_API}/profile`).then((res) => {
      const {
        first_name: firstName,
        last_name: lastName,
        avatar_url: picture,
        profile_type: profileType,
        email,
        headline,
        company,
        website,
        id,
        status,
      } = res.data;
      const fullProfile = {
        firstName,
        lastName,
        picture,
        profileType,
        email,
        headline,
        company,
        website,
        id,
        status,
      };
      setProfile(fullProfile);
      return fullProfile;
    });
  };

  const value = {
    profile,
    setProfile,
    refresh,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export const useProfile = function () {
  const context = React.useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
