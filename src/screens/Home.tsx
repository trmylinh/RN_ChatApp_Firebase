/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Search from './components/Search';
import { DocumentData, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { User } from 'firebase/auth';
import { ChatContext } from '../../App';
import { useAuth } from '../hooks/useAuth';

export default function HomeScreen({ navigation, route }: any) {
  const { user } = route.params;
  const { currentUser } = useAuth();
  const [chats, setChats] = useState<User | []>([]);
  const { dispatch }: any = useContext(ChatContext);
  useEffect(() => {
    const getChats = () => {
      if (currentUser) {
        const unsubcribe = onSnapshot(doc(db, 'userChats', currentUser?.uid), (e: DocumentData) => {
          setChats(e.data());
        });
        return () => {
          unsubcribe();
        };

      }
    };
    currentUser?.uid && getChats();

  }, [currentUser]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => {
          navigation.navigate('Profile', { user });
        }}>
          {user ? <Text style={{ marginRight: 20 }}>{user.displayName}</Text> : null}
        </TouchableOpacity>
      ),
    });
  }, [chats, navigation, user]);

  const handleSelect = (u: any) => {
    dispatch({ type: 'CHANGE_USER', payload: u });
    navigation.navigate('Messenger', { user });
  };

  return (
    <View>
      <Search item={user}/>
      {Object.entries(chats)?.sort((a,b) => b[1].createdAt - a[1].createdAt).map((chat) =>
      (
        <TouchableOpacity
          onPress={() => handleSelect(chat[1].userInfo)}
          style={styles.viewChat}
          key={chat[0]}
        >
          <View>
            <Image
              style={styles.imgView}
              source={{ uri: `${chat[1].userInfo?.photoURL}`}}
            />
            <Text style={styles.textUnread}>
              3
            </Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Text style={styles.textName}>{chat[1].userInfo.displayName}</Text>
            <Text style={styles.textMessage}>{chat[1].lastMessage?.text}</Text>
          </View>
          <View style={styles.timeView}>
            <Text style={styles.textTime}>4 minutes ago</Text>

          </View>
        </TouchableOpacity>
      )
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  viewChat: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
  },
  imgView: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 40,
    marginRight: 15,
    marginStart: 10,
  },
  textUnread: {
    backgroundColor: 'red',
    position: 'absolute',
    right: 8,
    borderRadius: 20,
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  textName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textMessage: {
    color: 'black',
    // color: colors.inactive
    fontSize: 15,
  },
  timeView: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  textTime: {
    color: 'black',
    marginRight: 10,
  },
}
);
