import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStorageData = async () => {
            try {
                const storedToken = await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
                const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);

                if (storedToken && storedUser) {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));
                }
            } catch (e) {
                console.error('Failed to load storage data', e);
            } finally {
                setLoading(false);
            }
        };

        loadStorageData();
    }, []);

    const loginAuth = async (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
        await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, userToken);
        await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
    };

    const logoutAuth = async () => {
        setUser(null);
        setToken(null);
        await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, loading, loginAuth, logoutAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
