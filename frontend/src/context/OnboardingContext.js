import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { AuthContext } from './AuthContext';

export const OnboardingContext = createContext();

export const OnboardingProvider = ({ children }) => {
    const { token, setUser } = useContext(AuthContext);
    const [onboardingData, setOnboardingData] = useState({
        name: '',
        gender: '',
        age: 18,
        height_cm: 165,
        education: '',
        interests: [],
        looking_for: [],
        photos: [],
        bio: '',
        location: {
            city: '',
            coordinates: [0, 0]
        }
    });

    const updateOnboardingData = (newData) => {
        setOnboardingData(prev => ({ ...prev, ...newData }));
    };

    const submitOnboarding = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.post(`${API_BASE_URL}/users/register-complete`, onboardingData, config);
            if (response.data) {
                // Update local user state if needed
                setUser(response.data.user);
                return { success: true };
            }
        } catch (error) {
            console.error('Onboarding submission failed:', error.response?.data || error.message);
            return { success: false, error: error.response?.data?.message || 'Submission failed' };
        }
    };

    return (
        <OnboardingContext.Provider value={{ onboardingData, updateOnboardingData, submitOnboarding }}>
            {children}
        </OnboardingContext.Provider>
    );
};
