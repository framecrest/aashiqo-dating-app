import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { COLORS, SPACING } from '../utils/theme';
import { AuthContext } from '../context/AuthContext';
import { register } from '../services/authService';

const RegisterScreen = ({ navigation }) => {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const { loginAuth } = useContext(AuthContext);

    const handleRegister = async () => {
        const { email, phone, password } = formData;
        if (!email || !phone || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            // Include dummy data for required fields if backend still requires them at this stage
            const registerData = {
                ...formData,
                name: 'User', // Placeholder
                age: 18,      // Placeholder
                gender: 'Other', // Placeholder
                city: 'Unknown'  // Placeholder
            };
            const data = await register(registerData);
            loginAuth(data, data.token);
            // After loginAuth sets token, we want to stay in AuthStack to complete onboarding
            // This might require a change in App.js or AuthContext
            navigation.navigate('NameInput');
        } catch (error) {
            Alert.alert('Registration Failed', error.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Start your journey to find your dil connection</Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={COLORS.textTertiary}
                    value={formData.email}
                    onChangeText={(val) => setFormData({ ...formData, email: val })}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    placeholderTextColor={COLORS.textTertiary}
                    value={formData.phone}
                    onChangeText={(val) => setFormData({ ...formData, phone: val })}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={COLORS.textTertiary}
                    value={formData.password}
                    onChangeText={(val) => setFormData({ ...formData, password: val })}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleRegister}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color={COLORS.white} />
                    ) : (
                        <Text style={styles.buttonText}>Register</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.linkText}>Already have an account? Login</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: SPACING.xl,
        backgroundColor: COLORS.background,
        flexGrow: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: SPACING.xs,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xl,
    },
    form: {
        marginTop: SPACING.md,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: SPACING.md,
        borderRadius: 12,
        marginBottom: SPACING.md,
        backgroundColor: COLORS.surfaceVariant,
        color: COLORS.textPrimary,
    },
    button: {
        backgroundColor: COLORS.primary,
        padding: SPACING.md,
        borderRadius: 12,
        alignItems: 'center',
        marginVertical: SPACING.md,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    linkText: {
        textAlign: 'center',
        marginBottom: SPACING.lg,
        color: COLORS.primary,
        fontWeight: '500',
    },
});

export default RegisterScreen;
