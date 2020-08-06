export interface Auth0Profile {
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
}

export interface FullProfile extends Auth0Profile {
  profileType: "Recruiter" | "Seeker";
  headline: string;
  website: string;
  company?: string;
}
