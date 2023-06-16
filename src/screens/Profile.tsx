/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, { useLayoutEffect } from 'react';
import { Text, TouchableOpacity, View} from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAuth } from '../hooks/useAuth';

export default function Profile({navigation} : any) {
  // const {user} = route.params;
  // console.log('auth sign out', auth);
  const {currentUser} = useAuth();
  const onSignOut = () => {
    signOut(auth)
    .then(()=>{
      console.log('log out success');
    })
    .catch(error => console.log('Error logging out: ', error));
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
      <Text>Profile {currentUser?.displayName}</Text>
    </View>
  );
}
