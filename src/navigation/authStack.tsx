/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
// import Messenger from '../screens/messenger/Messenger';
import { LogIn } from '../screens/LogIn';
import { Register } from '../screens/Register';
import HomeScreen from '../screens/Home';
import Profile from '../screens/Profile';
import Messenger from '../screens/Messenger';

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
            {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: true }}/>
            <Stack.Screen name="Messenger" component={Messenger} options={{ headerShown: true }}/> */}
            {/* <Stack.Screen name="Messenger" component={Messenger} /> */}
        </Stack.Navigator>
    );
};
