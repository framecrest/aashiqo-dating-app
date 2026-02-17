import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import NextButton from '../../components/onboarding/NextButton';
import OptionCard from '../../components/onboarding/OptionCard';
import { OnboardingContext } from '../../context/OnboardingContext';
import { SPACING } from '../../utils/theme';

const GenderSelectionScreen = ({ navigation }) => {
    const { onboardingData, updateOnboardingData } = useContext(OnboardingContext);
    const [gender, setGender] = useState(onboardingData.gender);

    const options = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Non-binary', value: 'Non-binary' },
        { label: 'Prefer not to say', value: 'Prefer not to say' },
    ];

    const handleNext = () => {
        if (gender) {
            updateOnboardingData({ gender });
            navigation.navigate('AgeSelection');
        }
    };

    return (
        <OnboardingLayout
            title="What's your gender?"
            subtitle="Pick the one that describes you best."
            currentStep={2}
            onBack={() => navigation.goBack()}
        >
            <View style={styles.optionsContainer}>
                {options.map((opt) => (
                    <OptionCard
                        key={opt.value}
                        label={opt.label}
                        isSelected={gender === opt.value}
                        onSelect={() => setGender(opt.value)}
                    />
                ))}
            </View>

            <NextButton
                onPress={handleNext}
                disabled={!gender}
            />
        </OnboardingLayout>
    );
};

const styles = StyleSheet.create({
    optionsContainer: {
        marginTop: SPACING.lg,
    },
});

export default GenderSelectionScreen;
