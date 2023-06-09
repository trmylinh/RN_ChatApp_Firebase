/* eslint-disable prettier/prettier */

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { LogIn } from '../screens/LogIn';
import { Register } from '../screens/Register';

const Stack = createStackNavigator();

export const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="LogIn" component={LogIn} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    );
};
