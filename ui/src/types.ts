export interface User {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  job_title: string;
  company: string;
}

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

export interface PostInterface {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  connectedCount: number;
  connectedUser: boolean;
  active: boolean;
  favourite: boolean;
  created_by: User;
}

export type CategoryTypes = "jobs" | "talents";

export interface MessageDialogParameters {
  title: string;
  job_poster: User;
  position: {
    job_title: string;
    placeholder: string;
  };
  current_user: User;
}
