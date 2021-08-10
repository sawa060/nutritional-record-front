import React, {createContext, useContext, useState} from 'react';

import {User} from '../auth/auth_types';

const GlobalContext = createContext<{
  currentUser: User | undefined;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
}>({
  currentUser: undefined,
  setCurrentUser: () => {},
});

export const useGlobalContext = () => useContext(GlobalContext);

export type GlobalContextProviderProps = {
  children: React.ReactNode;
};

export const GlobalContextProvider: React.VFC<GlobalContextProviderProps> = ({children}) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  return (
    <GlobalContext.Provider value={{currentUser, setCurrentUser}}>
      {children}
    </GlobalContext.Provider>
  );
};
