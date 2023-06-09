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
    // <Tab.Navigator
    //   initialRouteName="Feed"
    //   screenOptions={{
    //     tabBarActiveTintColor: '#e91e63',
    //   }}
    // >
    //   <Tab.Screen
    //     name="Home"
    //     component={HomeScreen}
    //     options={{
    //       tabBarLabel: 'Home',
    //       tabBarIcon: ({ color, size }) => (
    //         <MaterialCommunityIcons name="home" color={color} size={size} />
    //       ),
    //     }}
    //   />
    //   <Tab.Screen
    //     name="Profile"
    //     component={Profile}
    //     options={{
    //       tabBarLabel: 'Profile',
    //       tabBarIcon: ({ color, size }) => (
    //         <MaterialCommunityIcons name="account" color={color} size={size} />
    //       ),
    //     }}
    //   />
    //   {/* <Tab.Screen
    //       name="Messenger"
    //       component={Messenger}
    //       options={{
    //         tabBarLabel: 'Messenger',
    //         tabBarIcon: ({ color, size }) => (
    //           <MaterialCommunityIcons name="chat" color={color} size={size} />
    //         ),
    //       }}
    //     /> */}
    //   {/* <Stack.Screen name="Messenger" component={Messenger}/> */}
    // </Tab.Navigator>
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

