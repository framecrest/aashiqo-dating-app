import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../../utils/theme';

const ChipItem = ({ label, isSelected, onSelect }) => {
    return (
        <TouchableOpacity
            onPress={onSelect}
            style={[
                styles.chip,
                isSelected && styles.selectedChip
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
    chip: {
        borderWidth: 1.5,
        borderColor: COLORS.border,
        borderRadius: 24,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 6,
        backgroundColor: COLORS.surface,
    },
    selectedChip: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primary + '20', // 20% opacity
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.textSecondary,
    },
    selectedLabel: {
        color: COLORS.primary,
        fontWeight: 'bold',
    },
});

export default ChipItem;
