/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { DocumentData, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Search({item} : any) {
    const [username, setUsername] = useState('');
    const [err, setErr] = useState(false);
    const [user, setUser] = useState<DocumentData | null>(null);

    const { currentUser } = useAuth();

    const handleSearch = async () => {
        const q = query(
            collection(db, 'users'),
            where('displayName', '==', username)
        );
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((e) => {
                setUser(e.data());
            });
        } catch (e) {
            setErr(!err);
        }
    };


    const handleSelect = async () => {
        //check xem có (chats in firestore) không, chưa có thì create
        if (currentUser) {
            const combinedId =
                currentUser.uid > user?.uid
                    ? currentUser.uid + user?.uid
                    : user?.uid + currentUser.uid;
            try {
                const res = await getDoc(doc(db, 'chats', combinedId));

                if (!res.exists()) {
                    // create document trong collect 'chats'
                    await setDoc(doc(db, 'chats', combinedId), { messages: [] });

                    // create user chats
                    await updateDoc(doc(db, 'userChats', currentUser.uid), {
                        [combinedId + '.userInfo']: {
                            uid: user?.uid,
                            displayName: user?.displayName,
                            photoURL: user?.photoURL,
                        },
                        [combinedId + '.date']: serverTimestamp(),
                    });

                    await updateDoc(doc(db, 'userChats', user?.uid), {
                        [combinedId + '.userInfo']: {
                            uid: item?.uid,
                            displayName: item?.displayName,
                            photoURL: item?.photoURL,
                        },
                        [combinedId + '.date']: serverTimestamp(),
                    });
                }
            } catch (e) { }
        }

        setUser(null);
        setUsername('');

    };

    return (
        <View>
            <TextInput
                style={styles.inputSearch}
                placeholder="Find a user"
                autoCapitalize="none"
                textContentType="name"
                value={username}
                onChangeText={(text) => setUsername(text)}
                onSubmitEditing={handleSearch}
            />
            {err && <Text style={{ color: 'red' }}>User not found!</Text>}
            {user && <TouchableOpacity onPress={handleSelect} style={styles.resultView}>
                <Image
                    style={styles.imgView}
                    source={{uri: `${user?.photoURL}`}}

                />
                <Text style={styles.textResult}>{user?.displayName}</Text>
            </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    inputSearch: {
        backgroundColor: '#CDB5CD',
    },
    imgView: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        borderRadius: 40,
        marginRight: 15,
        marginStart: 10,
    },
    resultView:{
        flexDirection: 'row',
        backgroundColor: '#FFE1FF',
    },
    textResult:{
        color: 'black',
        fontSize: 16,
        marginTop: 10,
    },
}
);
