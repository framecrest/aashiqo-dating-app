import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SPACING } from '../../utils/theme';

const NextButton = ({ onPress, title = "Next", disabled = false, loading = false }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled || loading}
            style={[
                styles.button,
                disabled && styles.disabledButton
            ]}
        >
            {loading ? (
                <ActivityIndicator color={COLORS.white} />
            ) : (
                <Text style={styles.text}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: COLORS.primary,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: SPACING.xl,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    disabledButton: {
        backgroundColor: COLORS.grayDark,
        shadowOpacity: 0,
        elevation: 0,
    },
    text: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default NextButton;
