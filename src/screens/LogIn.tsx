/* eslint-disable prettier/prettier */
import { View, Text, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

export const LogIn = ({ navigation }: any) => {
    const [value, setValue] = useState({
        email: '',
        password: '',
        error: '',
    });
    const logIn = async () => {
        if (value.email === '' || value.password === '') {
            setValue({
                ...value,
                error: 'Email and password are required',
            });
            return;
        }
        try {
            signInWithEmailAndPassword(auth, value.email, value.password)
                .then(() => console.log('Login success'))
                .catch((err) => console.log('Login error', err.message));
        } catch (error: any) {
            setValue({
                ...value,
                error: error.message,
            });
        }
    };
    return (
        <View style={styles.container}>
            <Image source={require('../../assets/backImage.png')} style={styles.backImage} />
            <View style={styles.whiteSheet} />
            <SafeAreaView style={styles.form}>
                <Text style={styles.title}>Log In</Text>
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
                <TouchableOpacity style={styles.button} onPress={logIn}>
                    <Text style={styles.textLogIn}> Log In</Text>
                </TouchableOpacity>
                <View style={styles.footerView}>
                    <Text style={styles.textFooter}>Don't have an account? </Text>
                    <TouchableOpacity>
                        <Text style={styles.textRegisterFooter} onPress={() => navigation.navigate('Register')}>Register</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <StatusBar barStyle="light-content" />
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
        marginHorizontal: 30,
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


