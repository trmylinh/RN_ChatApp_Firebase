/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { Children, createContext, useReducer } from 'react';
import { RootNavigation } from './src/navigation';
import { useAuth } from './src/hooks/useAuth';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store';
export const AuthContext = createContext({});
export const ChatContext = createContext({});

const AuthProvider = ({ children }: any) => {
  const { currentUser } = useAuth();
  return (
    <AuthContext.Provider value={{currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

const ChatProvider = ({ children }: any) => {
  const currentUser = useSelector((state: any) => state.login.user);
  const INITIAL_STATE = {
    chatId: 'null',
    user: {},
  };

  const chatReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatId: currentUser ?
            (currentUser?.uid > action.payload.uid
              ? currentUser?.uid + action.payload.uid
              : action.payload.uid + currentUser?.uid)
            : null,
        };
      default: return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );

};

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AuthProvider>
          <ChatProvider>
            <RootNavigation />
          </ChatProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
