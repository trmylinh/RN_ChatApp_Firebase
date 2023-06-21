/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore } from 'redux';
import { rootReducer } from './src/redux/reducer';
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whiteList: ['login'],
};
export const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
