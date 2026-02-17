import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import NextButton from '../../components/onboarding/NextButton';
import { OnboardingContext } from '../../context/OnboardingContext';
import { COLORS, SPACING } from '../../utils/theme';
import * as Location from 'expo-location';
import { MapPin } from 'lucide-react-native';

const LocationPermissionScreen = ({ navigation }) => {
    const { onboardingData, updateOnboardingData, submitOnboarding } = useContext(OnboardingContext);
    const [loading, setLoading] = useState(false);

    const handleComplete = async () => {
        setLoading(true);
        let locationData = { city: 'Unknown', coordinates: [0, 0] };

        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                let location = await Location.getCurrentPositionAsync({});
                locationData.coordinates = [location.coords.longitude, location.coords.latitude];

                // Get city name (reverse geocoding)
                let geocode = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                });
                if (geocode.length > 0) {
                    locationData.city = geocode[0].city || geocode[0].region || 'Unknown';
                }
            }
        } catch (error) {
            console.warn('Location access failed', error);
        }

        // Update data and call final submission
        updateOnboardingData({ location: locationData });

        // Use the updated data directly since state update might be async
        const finalData = { ...onboardingData, location: locationData };

        const result = await submitOnboarding();
        setLoading(false);

        if (result.success) {
            // Navigation to Main App will happen automatically via AuthContext if token is set
            // or we might need to trigger a re-render/navigate
        } else {
            Alert.alert('Error', result.error || 'Something went wrong');
        }
    };

    return (
        <OnboardingLayout
            title="Enable Location"
            subtitle="We use your location to find matches nearby."
            currentStep={10}
            onBack={() => navigation.goBack()}
        >
            <View style={styles.centerCol}>
                <View style={styles.iconCircle}>
                    <MapPin size={64} color={COLORS.primary} />
                </View>
                <Text style={styles.infoText}>
                    Aashiqo needs access to your location to show you people in your area.
                </Text>
            </View>

            <NextButton
                title="Finish Registration"
                onPress={handleComplete}
                loading={loading}
            />
        </OnboardingLayout>
    );
};

const styles = StyleSheet.create({
    centerCol: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: COLORS.surfaceVariant,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xl,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    infoText: {
        textAlign: 'center',
        fontSize: 16,
        color: COLORS.textSecondary,
        lineHeight: 24,
    },
});

export default LocationPermissionScreen;
