import React, { useState, useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import NextButton from '../../components/onboarding/NextButton';
import OptionCard from '../../components/onboarding/OptionCard';
import { OnboardingContext } from '../../context/OnboardingContext';
import { SPACING } from '../../utils/theme';

const EducationSelectionScreen = ({ navigation }) => {
    const { onboardingData, updateOnboardingData } = useContext(OnboardingContext);
    const [education, setEducation] = useState(onboardingData.education);

    const levels = [
        "High School",
        "Diploma",
        "Bachelor’s Degree",
        "Master’s Degree",
        "MBA",
        "PhD",
        "Other"
    ];

    const handleNext = () => {
        if (education) {
            updateOnboardingData({ education });
            navigation.navigate('InterestSelection');
        }
    };

    return (
        <OnboardingLayout
            title="Your education?"
            subtitle="Tell us about your academic background."
            currentStep={5}
            onBack={() => navigation.goBack()}
        >
            <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
                <View style={styles.container}>
                    {levels.map((level) => (
                        <OptionCard
                            key={level}
                            label={level}
                            isSelected={education === level}
                            onSelect={() => setEducation(level)}
                        />
                    ))}
                </View>
            </ScrollView>

            <NextButton
                onPress={handleNext}
                disabled={!education}
            />
        </OnboardingLayout>
    );
};

const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    container: {
        paddingTop: SPACING.md,
        paddingBottom: SPACING.xl,
    },
});

export default EducationSelectionScreen;
