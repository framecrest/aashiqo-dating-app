import React, { useState, useContext } from 'react';
import { TextInput, StyleSheet, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import NextButton from '../../components/onboarding/NextButton';
import { OnboardingContext } from '../../context/OnboardingContext';
import { COLORS, SPACING } from '../../utils/theme';

const BioScreen = ({ navigation }) => {
    const { onboardingData, updateOnboardingData } = useContext(OnboardingContext);
    const [bio, setBio] = useState(onboardingData.bio);

    const handleNext = () => {
        updateOnboardingData({ bio });
        navigation.navigate('LocationPermission');
    };

    return (
        <OnboardingLayout
            title="Tell us about you"
            subtitle="Write a short bio to let others know you better."
            currentStep={9}
            onBack={() => navigation.goBack()}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Write something interesting..."
                        value={bio}
                        onChangeText={setBio}
                        multiline
                        numberOfLines={4}
                        maxLength={300}
                        autoFocus
                        placeholderTextColor={COLORS.gray}
                    />
                    <Text style={styles.charCount}>{bio.length}/300</Text>
                </View>

                <NextButton onPress={handleNext} />
            </KeyboardAvoidingView>
        </OnboardingLayout>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: SPACING.xl,
        backgroundColor: COLORS.surfaceVariant,
        borderRadius: 20,
        padding: SPACING.lg,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    input: {
        fontSize: 18,
        color: COLORS.textPrimary,
        height: 180,
        textAlignVertical: 'top',
    },
    charCount: {
        textAlign: 'right',
        color: COLORS.textTertiary,
        fontSize: 12,
        marginTop: SPACING.sm,
    },
});

export default BioScreen;
