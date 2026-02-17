import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import NextButton from '../../components/onboarding/NextButton';
import OptionCard from '../../components/onboarding/OptionCard';
import { OnboardingContext } from '../../context/OnboardingContext';
import { SPACING } from '../../utils/theme';

const LookingForScreen = ({ navigation }) => {
    const { onboardingData, updateOnboardingData } = useContext(OnboardingContext);
    const [lookingFor, setLookingFor] = useState(onboardingData.looking_for || []);

    const options = [
        { label: 'Serious relationship', value: 'Serious relationship' },
        { label: 'Casual dating', value: 'Casual dating' },
        { label: 'Friendship', value: 'Friendship' },
        { label: 'Marriage', value: 'Marriage' },
    ];

    const toggleOption = (val) => {
        if (lookingFor.includes(val)) {
            setLookingFor(prev => prev.filter(i => i !== val));
        } else {
            setLookingFor(prev => [...prev, val]);
        }
    };

    const handleNext = () => {
        if (lookingFor.length > 0) {
            updateOnboardingData({ looking_for: lookingFor });
            navigation.navigate('PhotoUpload');
        }
    };

    return (
        <OnboardingLayout
            title="Looking for?"
            subtitle="What are you hoping to find here?"
            currentStep={7}
            onBack={() => navigation.goBack()}
        >
            <View style={styles.container}>
                {options.map((opt) => (
                    <OptionCard
                        key={opt.value}
                        label={opt.label}
                        isSelected={lookingFor.includes(opt.value)}
                        onSelect={() => toggleOption(opt.value)}
                    />
                ))}
            </View>

            <NextButton
                onPress={handleNext}
                disabled={lookingFor.length === 0}
            />
        </OnboardingLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: SPACING.lg,
    },
});

export default LookingForScreen;
