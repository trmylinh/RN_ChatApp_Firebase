/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, createContext } from 'react';
import {User, getAuth, onAuthStateChanged} from 'firebase/auth';
import { auth } from '../config/firebase';
export const AuthContext = createContext({});
export const useAuth = () =>{
    const [currentUser, setCurrentUser] = useState<User>();

    useEffect(()=>{
        const unsubcribeFromAuthStateChanged = onAuthStateChanged(auth, (user) =>{
            if (user){
                setCurrentUser(user);
            }
            else {
                setCurrentUser(undefined);
            }
        });
        return unsubcribeFromAuthStateChanged;
    },[]);

    return {
        currentUser,
    };
};

