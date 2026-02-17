import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { STORAGE_KEYS } from '../utils/constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Initial load from storage
    useEffect(() => {
        const loadStorageData = async () => {
            try {
                const [storedToken, storedUser] = await Promise.all([
                    SecureStore.getItemAsync(STORAGE_KEYS.AUTH_TOKEN),
                    AsyncStorage.getItem(STORAGE_KEYS.USER_DATA)
                ]);

                if (storedToken) setToken(storedToken);
                if (storedUser) setUser(JSON.parse(storedUser));

                console.log('App Loaded: Token present?', !!storedToken);
            } catch (e) {
                console.error('Failed to load storage data', e);
            } finally {
                setLoading(false);
            }
        };

        loadStorageData();
    }, []);

    // Helper to update user state AND storage
    const updateStoredUser = async (newUserData) => {
        setUser(newUserData);
        if (newUserData) {
            await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(newUserData));
        } else {
            await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
        }
    };

    const loginAuth = async (userData, userToken) => {
        setToken(userToken);
        await updateStoredUser(userData);
        await SecureStore.setItemAsync(STORAGE_KEYS.AUTH_TOKEN, userToken);
    };

    const logoutAuth = async () => {
        setToken(null);
        await updateStoredUser(null);
        await SecureStore.deleteItemAsync(STORAGE_KEYS.AUTH_TOKEN);
    };

    return (
        <AuthContext.Provider value={{
            user,
            setUser: updateStoredUser, // Wrap setUser to always persist
            token,
            loading,
            loginAuth,
            logoutAuth
        }}>
            {children}
        </AuthContext.Provider>
    );
};
