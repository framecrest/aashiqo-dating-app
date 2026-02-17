import React, { useState, useContext } from 'react';
import { TextInput, StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import NextButton from '../../components/onboarding/NextButton';
import { OnboardingContext } from '../../context/OnboardingContext';
import { COLORS, SPACING } from '../../utils/theme';

const NameInputScreen = ({ navigation }) => {
    const { onboardingData, updateOnboardingData } = useContext(OnboardingContext);
    const [name, setName] = useState(onboardingData.name);

    const handleNext = () => {
        if (name.trim().length >= 2) {
            updateOnboardingData({ name });
            navigation.navigate('GenderSelection');
        }
    };

    return (
        <OnboardingLayout
            title="What's your name?"
            subtitle="This will be displayed on your profile."
            currentStep={1}
            onBack={() => navigation.goBack()}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={setName}
                        autoFocus
                        maxLength={30}
                        placeholderTextColor={COLORS.gray}
                    />
                </View>

                <NextButton
                    onPress={handleNext}
                    disabled={name.trim().length < 2}
                />
            </KeyboardAvoidingView>
        </OnboardingLayout>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: SPACING.xl,
    },
    input: {
        fontSize: 24,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.primary,
        paddingBottom: SPACING.sm,
        color: COLORS.textPrimary,
    },
});

export default NameInputScreen;
