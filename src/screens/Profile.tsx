/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useLayoutEffect } from 'react';
import { Text, TouchableOpacity, View} from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function Profile({navigation, route} : any) {
  const {user} = route.params;
  console.log('auth sign out', auth);
  const onSignOut = () => {
    signOut(auth).catch(error => console.log('Error logging out: ', error));
    // navigation.navigate('LogIn');
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={onSignOut}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  return (
    <View>
      <Text>Profile {user?.displayName}</Text>
    </View>
  );
}
