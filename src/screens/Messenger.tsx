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
import { TouchableOpacity, Text, View, TextInput, StyleSheet } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import { auth, db } from '../config/firebase';
import { ChatContext } from '../../App';
import { Timestamp, addDoc, arrayUnion, collection, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../hooks/useAuth';
import { format } from 'date-fns';

export default function Messenger({ navigation, route }: any) {
  const { user } = route.params;
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { data }: any = useContext(ChatContext);
  const [text, setText] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>{data.user?.displayName}</Text>
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
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

    await updateDoc(doc(db, 'chats', data.chatId), {
      messages: arrayUnion({
        _id: uuidv4(),
        text,
        createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        user: {
          _id: user?.uid,
          name: user?.displayName,
          avatar: user?.photoURL,
        },
      }),
    });

    await updateDoc(doc(db, 'userChats', user?.uid), {
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

  }, [data, text, user]);

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


