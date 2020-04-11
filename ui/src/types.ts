export interface PostInterface {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  connectedCount: number;
  connectedUser: boolean;
  active: boolean;
  favourite: boolean;
}

export type CategoryTypes = "jobs" | "talents";
