import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Heart, MessageCircle, User } from 'lucide-react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SwipeScreen from '../screens/SwipeScreen';
import MatchesScreen from '../screens/MatchesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import { COLORS } from '../utils/theme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MatchesStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: COLORS.background },
            headerTintColor: COLORS.textPrimary,
            headerTitleStyle: { fontWeight: 'bold' },
            contentStyle: { backgroundColor: COLORS.background }
        }}
    >
        <Stack.Screen name="MatchesList" component={MatchesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
);

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Explore') return <Heart color={color} size={size} />;
                    if (route.name === 'Matches') return <MessageCircle color={color} size={size} />;
                    if (route.name === 'Profile') return <User color={color} size={size} />;
                },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.gray,
                tabBarStyle: {
                    backgroundColor: COLORS.background,
                    borderTopColor: COLORS.border,
                    height: 60,
                    paddingBottom: 8,
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Explore" component={SwipeScreen} />
            <Tab.Screen name="Matches" component={MatchesStack} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
