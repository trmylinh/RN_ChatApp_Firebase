/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useContext,
  useRef,
} from 'react';
import { TouchableOpacity, Text, View, TextInput, StyleSheet, Image } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { auth, db } from '../config/firebase';
import { AuthContext, ChatContext } from '../../App';
import { Timestamp, addDoc, arrayUnion, collection, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../hooks/useAuth';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

export default function Messenger({ navigation, route}: any) {
  const {user} = route.params;
  // const { currentUser } = useAuth();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { data }: any = useContext(ChatContext);
  const [text, setText] = useState('');
  const currentUser = useSelector((state: any) => state.login.user);
  console.log('message', messages);
  console.log('data', data);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ flexDirection: 'row' }}
        >
          <Text style={{ marginVertical: 10 }}>{data.user?.displayName}</Text>
          <Image
            source={{ uri: `${data.user?.photoURL}` }}
            style={styles.imgAvt}
          />
        </TouchableOpacity>
      ),
    });
  }, [data, navigation]);

  useLayoutEffect(() => {
    const unsubcribe = onSnapshot(doc(db, 'chats', data.chatId), (e) => {
      e.exists() && setMessages(e.data().messages);
    });
    return () => {
      unsubcribe();
    };
  }, [data.chatId]);


  const onSend = useCallback(async (messages = []) => {
    if (currentUser) {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          _id: uuidv4(),
          text,
          createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
          user: {
            _id: currentUser?.uid,
            name: currentUser?.displayName,
            avatar: currentUser?.photoURL,
          },
        }),
      });

      await updateDoc(doc(db, 'userChats', currentUser.uid), {
        [data.chatId + '.lastMessage']: {
          text,
        },
        [data.chatId + '.date']: serverTimestamp(),
      });

      await updateDoc(doc(db, 'userChats', data.user?.uid), {
        [data.chatId + '.lastMessage']: {
          text,
        },
        [data.chatId + '.date']: serverTimestamp(),
      });
    }
  }, [data, text, currentUser]);

  return (
    <GiftedChat
      text={text}
      onInputTextChanged={text => setText(text)}
      messages={messages.sort((a, b) => Date.parse(b.createdAt?.toString()) - Date.parse(a.createdAt?.toString()))}
      showAvatarForEveryMessage={false}
      showUserAvatar={true}
      onSend={(messages: any) => onSend(messages)}
      messagesContainerStyle={{
        backgroundColor: '#fff',
      }}
      user={{
        _id: currentUser?.uid,
      }}
    />
  );
}
const styles = StyleSheet.create({
  imgAvt: {
    width: 35,
    height: 35,
    resizeMode: 'cover',
    borderRadius: 40,
    marginRight: 15,
    marginStart: 10,
  },
}
);


