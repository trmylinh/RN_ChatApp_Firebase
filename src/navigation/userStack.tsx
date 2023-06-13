/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/Home';
import Feather from 'react-native-vector-icons/Feather';
import SvgUri from 'react-native-svg-uri';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntOutline } from 'antd-mobile-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from '../screens/Profile';
import Messenger from '../screens/Messenger';
import { createStackNavigator } from '@react-navigation/stack';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
export const UserStack = () => {
  return (
    <Stack.Navigator
    // screenOptions={{
    //     headerShown: false,
    // }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Messenger" component={Messenger} />
    </Stack.Navigator>
  );
};

