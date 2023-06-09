/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback,
} from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

import { RouteProp, useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebase';

export default function Messenger({navigation}: any) {
    const [messages, setMessages] = useState<IMessage[]>([]);

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //       headerLeft: () => (
    //        <TouchableOpacity onPress={() => navigation.goBack()}>
    //             <Text>Back</Text>
    //        </TouchableOpacity>
    //       ),
    //     });
    //   }, [navigation]);

    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Linhhhh',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ]);
      }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
      }, []);

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={false}
            showUserAvatar={false}
            onSend={(messages: any) => onSend(messages)}
            messagesContainerStyle={{
                backgroundColor: '#fff',
            }}
            user={{
                _id: auth?.currentUser?.email ? auth.currentUser.email : 1,
                avatar: 'https://i.pravatar.cc/300',
            }}
        />
    );
}

