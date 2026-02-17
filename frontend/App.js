import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import AuthStack from './src/navigation/AuthStack';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import { ActivityIndicator, View } from 'react-native';
import { COLORS } from './src/utils/theme';

import { OnboardingProvider } from './src/context/OnboardingContext';

import OnboardingStack from './src/navigation/OnboardingStack';

const RootNavigation = () => {
  const { token, user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  // Determine which stack to show
  const renderStack = () => {
    if (!token) return <AuthStack />;
    if (user && !user.onboarded) return <OnboardingStack />;
    return <MainTabNavigator />;
  };

  return (
    <NavigationContainer>
      {renderStack()}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <OnboardingProvider>
        <RootNavigation />
      </OnboardingProvider>
    </AuthProvider>
  );
}
