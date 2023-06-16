/* eslint-disable prettier/prettier */
/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import 'firebase/storage';
import firebase from '@react-native-firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyCVLLqKVp-42ffSRsRi8QbMRacg01GLXY8',
  authDomain: 'chatapp-firebase-7f137.firebaseapp.com',
  projectId: 'chatapp-firebase-7f137',
  storageBucket: 'chatapp-firebase-7f137.appspot.com',
  messagingSenderId: '480899656974',
  appId: '1:480899656974:web:76e8ba8e0b56829658fb5f',
  measurementId: 'G-50DBP6LSRT',
};

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
// initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage(app);