/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { createContext } from 'react';
import { RootNavigation } from './src/navigation';
import { useAuth } from './src/hooks/useAuth';
export const AuthContext = createContext({});
const AuthProvider = ({children}: any) =>{
  const {user} = useAuth();
  console.log('user', user);
  console.log('children', children);
  return (
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
  );
};

function App(): JSX.Element {
  return (
    <AuthProvider>
      <RootNavigation />
    </AuthProvider>
  );
}

export default App;
