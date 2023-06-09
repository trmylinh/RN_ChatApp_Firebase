/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { View, Text, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export const Register = ({ navigation }: any) => {
    const [value, setValue] = useState({
        email: '',
        password: '',
        displayName: '',
        error: '',
    });

    const register = async () => {
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are required',
            });
            return;
        }
        try {
            console.log('auth', auth.currentUser);
            // await createUserWithEmailAndPassword(auth, value.email, value.password);
            createUserWithEmailAndPassword(auth, value.email, value.password)
                .then(() => console.log('Register success'))
                .catch((err) => console.log('Register error', err.message));

            console.log('resgiter press');
            // navigation.navigate('LogIn');
        } catch (error: any) {
            setValue({
                ...value,
                error: error.message,
            });
        }
    };
    return (
        <View style={styles.container}>
            {/* <Image source={require('../../assets/backImage.png')} style={styles.backImage} />
            <View style={styles.whiteSheet} /> */}
            <SafeAreaView style={styles.form}>
                <Text style={styles.title}>Register</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter display name"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="name"
                    value={value.displayName}
                    onChangeText={(text) => setValue({ ...value, displayName: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoFocus={true}
                    value={value.email}
                    onChangeText={(text) => setValue({ ...value, email: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={value.password}
                    onChangeText={(text) => setValue({ ...value, password: text })}
                />
                <TouchableOpacity style={styles.button} onPress={register}>
                    <Text style={styles.textLogIn}>Register</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.textFooter}>Have an account? </Text>
                    <TouchableOpacity>
                        <Text style={styles.textRegisterFooter} onPress={() => navigation.navigate('LogIn')}>LogIn</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {/* <StatusBar barStyle="light-content" /> */}
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'orange',
        alignSelf: 'center',
        paddingBottom: 24,
    },
    input: {
        backgroundColor: '#F6F7FB',
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    backImage: {
        width: '100%',
        height: 340,
        position: 'absolute',
        top: 0,
        resizeMode: 'cover',
    },
    whiteSheet: {
        // flex: 1,
        width: '100%',
        height: '75%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        width: '100%',
        height: '75%',
    },
    button: {
        backgroundColor: '#f57c00',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    textLogIn: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 18,
    },
    footerView: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
    },
    textFooter: {
        color: 'gray',
        fontWeight: '600',
        fontSize: 14,
    },
    textRegisterFooter: {
        color: '#f57c00',
        fontWeight: '600',
        fontSize: 14,
    },
});


