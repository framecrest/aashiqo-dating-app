import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import NextButton from '../../components/onboarding/NextButton';
import { OnboardingContext } from '../../context/OnboardingContext';
import { COLORS, SPACING } from '../../utils/theme';
import { Minus, Plus } from 'lucide-react-native';

const AgeSelectionScreen = ({ navigation }) => {
    const { onboardingData, updateOnboardingData } = useContext(OnboardingContext);
    const [age, setAge] = useState(onboardingData.age || 18);

    const handleNext = () => {
        updateOnboardingData({ age });
        navigation.navigate('HeightSelection');
    };

    const increment = () => {
        if (age < 60) setAge(prev => prev + 1);
    };

    const decrement = () => {
        if (age > 18) setAge(prev => prev - 1);
    };

    return (
        <OnboardingLayout
            title="How old are you?"
            subtitle="You must be 18 or older to use Aashiqo."
            currentStep={3}
            onBack={() => navigation.goBack()}
        >
            <View style={styles.pickerContainer}>
                <TouchableOpacity onPress={decrement} style={styles.controlButton}>
                    <Minus size={32} color={COLORS.primary} />
                </TouchableOpacity>

                <View style={styles.ageDisplay}>
                    <Text style={styles.ageText}>{age}</Text>
                    <Text style={styles.yearsLabel}>years old</Text>
                </View>

                <TouchableOpacity onPress={increment} style={styles.controlButton}>
                    <Plus size={32} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            <NextButton onPress={handleNext} title="Confirm Age" />
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
    ageDisplay: {
        alignItems: 'center',
        marginHorizontal: SPACING.xl,
    },
    ageText: {
        fontSize: 100,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    yearsLabel: {
        fontSize: 18,
        color: COLORS.textSecondary,
        marginTop: -10,
    },
});

export default AgeSelectionScreen;
