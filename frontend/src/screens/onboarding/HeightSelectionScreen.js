import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import NextButton from '../../components/onboarding/NextButton';
import { OnboardingContext } from '../../context/OnboardingContext';
import { COLORS, SPACING } from '../../utils/theme';
import { Minus, Plus } from 'lucide-react-native';

const HeightSelectionScreen = ({ navigation }) => {
    const { onboardingData, updateOnboardingData } = useContext(OnboardingContext);
    const [height, setHeight] = useState(onboardingData.height_cm || 165);

    const handleNext = () => {
        updateOnboardingData({ height_cm: height });
        navigation.navigate('EducationSelection');
    };

    const ft = Math.floor(height / 30.48);
    const inches = Math.round((height / 2.54) % 12);

    return (
        <OnboardingLayout
            title="What's your height?"
            subtitle="Show off your stature."
            currentStep={4}
            onBack={() => navigation.goBack()}
        >
            <View style={styles.pickerContainer}>
                <TouchableOpacity onPress={() => setHeight(h => Math.max(120, h - 1))} style={styles.controlButton}>
                    <Minus size={32} color={COLORS.primary} />
                </TouchableOpacity>

                <View style={styles.display}>
                    <Text style={styles.mainText}>{height}</Text>
                    <Text style={styles.unitLabel}>cm</Text>
                    <Text style={styles.subText}>{ft}'{inches}"</Text>
                </View>

                <TouchableOpacity onPress={() => setHeight(h => Math.min(220, h + 1))} style={styles.controlButton}>
                    <Plus size={32} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            <NextButton onPress={handleNext} />
        </OnboardingLayout>
    );
};

const styles = StyleSheet.create({
    pickerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlButton: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: COLORS.surfaceVariant,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    display: {
        alignItems: 'center',
        marginHorizontal: SPACING.xl,
    },
    mainText: {
        fontSize: 100,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    unitLabel: {
        fontSize: 24,
        fontWeight: '600',
        color: COLORS.primary,
        marginTop: -15,
    },
    subText: {
        fontSize: 20,
        color: COLORS.textSecondary,
        marginTop: 10,
    },
});

export default HeightSelectionScreen;
