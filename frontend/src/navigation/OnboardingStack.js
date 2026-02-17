import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NameInputScreen from '../screens/onboarding/NameInputScreen';
import GenderSelectionScreen from '../screens/onboarding/GenderSelectionScreen';
import AgeSelectionScreen from '../screens/onboarding/AgeSelectionScreen';
import HeightSelectionScreen from '../screens/onboarding/HeightSelectionScreen';
import EducationSelectionScreen from '../screens/onboarding/EducationSelectionScreen';
import InterestSelectionScreen from '../screens/onboarding/InterestSelectionScreen';
import LookingForScreen from '../screens/onboarding/LookingForScreen';
import PhotoUploadScreen from '../screens/onboarding/PhotoUploadScreen';
import BioScreen from '../screens/onboarding/BioScreen';
import LocationPermissionScreen from '../screens/onboarding/LocationPermissionScreen';
import { COLORS } from '../utils/theme';

const Stack = createNativeStackNavigator();

const OnboardingStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: COLORS.background }
            }}
        >
            <Stack.Screen name="NameInput" component={NameInputScreen} />
            <Stack.Screen name="GenderSelection" component={GenderSelectionScreen} />
            <Stack.Screen name="AgeSelection" component={AgeSelectionScreen} />
            <Stack.Screen name="HeightSelection" component={HeightSelectionScreen} />
            <Stack.Screen name="EducationSelection" component={EducationSelectionScreen} />
            <Stack.Screen name="InterestSelection" component={InterestSelectionScreen} />
            <Stack.Screen name="LookingFor" component={LookingForScreen} />
            <Stack.Screen name="PhotoUpload" component={PhotoUploadScreen} />
            <Stack.Screen name="Bio" component={BioScreen} />
            <Stack.Screen name="LocationPermission" component={LocationPermissionScreen} />
        </Stack.Navigator>
    );
};

export default OnboardingStack;
