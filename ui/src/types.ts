export interface User {
  id: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  job_title: string;
  company?: string;
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
  id: string;
  status: "Complete" | "Incomplete";
}

export interface PostInterface {
  id: string;
  title: string;
  description: string;
  connectedCount: number;
  connectedUser: boolean;
  active: boolean;
  favourite: boolean;
  created_at: Date;
  created_by: User;
  job_link?: string;
  company_link?: string;
  website?: string;
}

export type CategoryTypes = "jobs" | "talents";

export interface MessageDialogParameters {
  id: string;
  title: string;
  job_poster: User;
  position: {
    job_title: string;
    placeholder: string;
  };
  current_user: User;
}

export type PostType = "job" | "talent";
export type City = "Singapore";
