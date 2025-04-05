import { createContext } from 'react';

export type UserContextType = {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
