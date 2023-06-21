/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useLayoutEffect } from 'react';
import { Text, TouchableOpacity, View} from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
export default function Profile({navigation} : any) {
  const {currentUser} = useAuth();
  const user = useSelector((state: any) => state.login.user);
  const dispatch = useDispatch();
  const onSignOut = () => {
    // signOut(auth)
    // .then(()=>{
    //   console.log('log out success');
    // })
    // .catch(error => console.log('Error logging out: ', error));
    dispatch({ type: 'LOGOUT', payload: user });
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
