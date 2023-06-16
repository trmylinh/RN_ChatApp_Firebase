/* eslint-disable prettier/prettier */
import React from 'react';
import {AuthStack} from './authStack';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import { UserStack } from './userStack';
export const RootNavigation = () =>{
    const {currentUser} = useAuth();
    return (
        <NavigationContainer>
            {currentUser ? <UserStack /> : <AuthStack />}
            {/* <AuthStack /> */}
        </NavigationContainer>
    );

};
