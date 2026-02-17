import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, SPACING, FONTS } from '../utils/theme';

const OnboardingScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Aashiqo</Text>
                <Text style={styles.tagline}>Find Your Dil Connection</Text>
                <Text style={styles.description}>
                    Discover meaningful connections with people who share your interests and values.
                </Text>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.loginLink}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.loginText}>Already have an account? Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: SPACING.xl,
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    tagline: {
        fontSize: 18,
        color: COLORS.textSecondary,
        marginTop: SPACING.sm,
    },
    description: {
        fontSize: 16,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginTop: SPACING.xl,
        lineHeight: 24,
    },
    footer: {
        width: '100%',
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: SPACING.md,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: SPACING.md,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginLink: {
        alignItems: 'center',
    },
    loginText: {
        color: COLORS.textSecondary,
        fontSize: 14,
    },
});

export default OnboardingScreen;
