/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect } from 'react';
import { AuthStack } from './authStack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext, useAuth } from '../hooks/useAuth';
import { UserStack } from './userStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

const RootStackNavigator = createStackNavigator();
export const RootNavigation = () => {
    const { currentUser } = useAuth();
    const isLoggedIn = useSelector((state: any) => state.login.isLoggedIn);
    return (
        <NavigationContainer>
            {isLoggedIn ? <UserStack /> : <AuthStack />}
        </NavigationContainer>
    );

};
