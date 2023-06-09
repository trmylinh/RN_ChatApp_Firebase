/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';
import {User, getAuth, onAuthStateChanged} from 'firebase/auth';
import { auth } from '../config/firebase';

// const auth = getAuth();

export const useAuth = () =>{
    const [user, setUser] = useState<User>();

    useEffect(()=>{
        const unsubcribeFromAuthStateChanged = onAuthStateChanged(auth, (user) =>{
            if (user){
                setUser(user);
            }
            else {
                setUser(undefined);
            }
        });
        return unsubcribeFromAuthStateChanged;
    },[]);

    return {
        user,
    };
};

