import React, { createContext } from 'react';
import { useQuery } from 'react-query';
import { api } from '../api';

const userContext = createContext({ user: {}, userLoading: true });

const UserProvider = ({ children }) => {
  const { data: user, isLoading: userLoading } = useQuery(
    'user',
    async () => {
      try {
        const { data: user } = await api.get("/user");
        return user;
      } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
      }
    },
    {
      staleTime: 300000,
      refetchOnWindowFocus: false,
    }
    );
    
  return (
    <userContext.Provider value={{ user, userLoading }}>
      {children}
    </userContext.Provider>
  );
};

export { userContext, UserProvider };

