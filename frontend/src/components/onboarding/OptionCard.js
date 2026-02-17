import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../utils/theme';

const OptionCard = ({ label, isSelected, onSelect }) => {
    return (
        <TouchableOpacity
            onPress={onSelect}
            style={[
                styles.card,
                isSelected && styles.selectedCard
            ]}
        >
            <Text style={[
                styles.label,
                isSelected && styles.selectedLabel
            ]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        borderWidth: 1.5,
        borderColor: COLORS.border,
        borderRadius: 16,
        paddingVertical: SPACING.md,
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.md,
        alignItems: 'center',
        backgroundColor: COLORS.surface,
    },
    selectedCard: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primary + '15', // Subtle primary tint
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.textSecondary,
    },
    selectedLabel: {
        color: COLORS.primary,
        fontWeight: '700',
    },
});

export default OptionCard;
