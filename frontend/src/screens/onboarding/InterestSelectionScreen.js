import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import NextButton from '../../components/onboarding/NextButton';
import ChipItem from '../../components/onboarding/ChipItem';
import { OnboardingContext } from '../../context/OnboardingContext';
import { COLORS, SPACING } from '../../utils/theme';

const InterestSelectionScreen = ({ navigation }) => {
    const { onboardingData, updateOnboardingData } = useContext(OnboardingContext);
    const [selectedInterests, setSelectedInterests] = useState(onboardingData.interests || []);

    const interests = [
        "Travel", "Music", "Movies", "Fitness", "Food",
        "Dancing", "Photography", "Gaming", "Startups",
        "Reading", "Cricket", "Spirituality", "Art",
        "Cooking", "Hiking", "Yoga", "Tech", "Business"
    ];

    const toggleInterest = (interest) => {
        if (selectedInterests.includes(interest)) {
            setSelectedInterests(prev => prev.filter(i => i !== interest));
        } else {
            setSelectedInterests(prev => [...prev, interest]);
        }
    };

    const handleNext = () => {
        if (selectedInterests.length >= 3) {
            updateOnboardingData({ interests: selectedInterests });
            navigation.navigate('LookingFor');
        }
    };

    return (
        <OnboardingLayout
            title="Your interests?"
            subtitle="Select at least 3 things you love."
            currentStep={6}
            onBack={() => navigation.goBack()}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.chipsContainer}>
                    {interests.map((item) => (
                        <ChipItem
                            key={item}
                            label={item}
                            isSelected={selectedInterests.includes(item)}
                            onSelect={() => toggleInterest(item)}
                        />
                    ))}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Text style={styles.countText}>
                    {selectedInterests.length} selected
                </Text>
                <NextButton
                    onPress={handleNext}
                    disabled={selectedInterests.length < 3}
                />
            </View>
        </OnboardingLayout>
    );
};

const styles = StyleSheet.create({
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: SPACING.md,
        paddingBottom: SPACING.xl,
    },
    footer: {
        marginTop: 'auto',
    },
    countText: {
        textAlign: 'center',
        marginBottom: SPACING.sm,
        color: COLORS.textSecondary,
        fontSize: 14,
    },
});

export default InterestSelectionScreen;
