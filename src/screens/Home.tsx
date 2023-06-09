/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React, { useLayoutEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import ChatItem from './ChatItem';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen({navigation}: any) {
  const { user } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
       <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Text>{user?.email}</Text>
       </TouchableOpacity>
      ),
    });
  }, [navigation, user?.email]);

  const [userList, setUserList] = useState([
    {
      url: 'https://randomuser.me/api/portraits/men/70.jpg',
      name: 'Amanda Weler',
      message: 'Hello, how are you ?',
      numberOfUnreadMessages: 3,
    },
    {
      url: 'https://randomuser.me/api/portraits/men/71.jpg',
      name: 'Amanda Weler',
      message: 'Hello, how are you ?',
      numberOfUnreadMessages: 3,
    },
  ]);

  const renderItem = ({ item }: any) => {
    return (
      <ChatItem
        onPress={() => {
          navigation.navigate('Messenger', {user: item});
        }}
        user={item} key={item.url}
      />
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={userList}
        renderItem={renderItem}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {

  },
});
