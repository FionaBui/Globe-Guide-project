import UserContext from './UserContext';
import { ReactNode, useEffect, useState } from 'react';

type Props = {
  children: ReactNode;
};
const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);
  const login = (username: string) => {
    setUser(username);
    localStorage.setItem('user', username);
  };
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  const contextValue = {
    user,
    login,
    logout,
  };

  return (
    <>
      <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    </>
  );
};
export default UserProvider;
