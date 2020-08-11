import React from "react";
import { FullProfile } from "../screens/Profile/types";

export interface ProfileContextValue {
  profile: FullProfile | null;
  setProfile: React.Dispatch<FullProfile>;
}

const ProfileContext = React.createContext<ProfileContextValue | undefined>(undefined);

export const ProfileProvider: React.FC = function (props) {
  const { children } = props;
  const [profile, setProfile] = React.useState<FullProfile | null>(null);

  const value = {
    profile,
    setProfile,
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export const useProfile = function () {
  const context = React.useContext(ProfileContext);
  return context;
};
