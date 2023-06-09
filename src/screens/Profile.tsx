/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View} from 'react-native';
import { useAuth } from '../hooks/useAuth';

export default function Profile() {
  const { user } = useAuth();

  return (
    <View>
      <Text>Profile {user?.email}</Text>
    </View>
  );
}
