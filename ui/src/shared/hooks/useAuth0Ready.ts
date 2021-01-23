import { useAuth0 } from "@auth0/auth0-react";

export default function useAuth0Ready(): boolean {
  const { isLoading } = useAuth0();

  return isLoading === false;
}
