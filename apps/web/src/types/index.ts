export type CreateWorkspaceData = {
  name: string;
  subDomain?: string;
};

export interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

export interface AuthContextProps {
  user: User | null;
  logout: () => void;
}
