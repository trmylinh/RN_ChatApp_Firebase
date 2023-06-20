/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { AuthStack } from './authStack';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import { UserStack } from './userStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';

const RootStackNavigator = createStackNavigator();
export const RootNavigation = () => {
    const {currentUser} = useAuth();
    return (
        <NavigationContainer>
            {currentUser ? <UserStack /> : <AuthStack />}
        </NavigationContainer>
    );

};
