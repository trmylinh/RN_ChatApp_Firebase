/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
interface Props{
    user?: {
        name?: string,
        url?: string,
        message?: string,
        numberOfUnreadMessages?: number,
        userId?: string
    },
    onPress?: () => void,
}
function ChatItem(props: Props) {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            style={styles.viewChat}>
            <View>
                <Image
                    style={styles.imgView}
                    source={{ uri: props?.user?.url }}
                />
                <Text style={styles.textUnread}>
                    {props?.user?.numberOfUnreadMessages}
                </Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
                <Text style={styles.textName}>{props?.user?.name}</Text>
                <Text style={styles.textMessage}>{props?.user?.message}</Text>
            </View>
            <View style={styles.timeView}>
                <Text style={styles.textTime}>4 minutes ago</Text>

            </View>
        </TouchableOpacity>
    );
}
export default ChatItem;
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
