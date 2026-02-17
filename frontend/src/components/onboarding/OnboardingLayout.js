import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { COLORS, SPACING } from '../../utils/theme';
import { ChevronLeft } from 'lucide-react-native';

const OnboardingLayout = ({
    children,
    title,
    subtitle,
    currentStep,
    totalSteps = 10,
    onBack,
    showBack = true
}) => {
    const progress = (currentStep / totalSteps) * 100;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { width: `${progress}%` }]} />
                </View>
                <View style={styles.navRow}>
                    {showBack ? (
                        <TouchableOpacity onPress={onBack} style={styles.backButton}>
                            <ChevronLeft size={28} color={COLORS.textPrimary} />
                        </TouchableOpacity>
                    ) : <View style={{ width: 28 }} />}
                </View>
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
                {children}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        paddingTop: Platform.OS === 'android' ? 40 : 10,
        paddingHorizontal: SPACING.lg,
    },
    progressContainer: {
        height: 4,
        width: '100%',
        backgroundColor: COLORS.border,
        borderRadius: 2,
        overflow: 'hidden',
        marginBottom: SPACING.md,
    },
    progressBar: {
        height: '100%',
        backgroundColor: COLORS.primary,
    },
    navRow: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    content: {
        flex: 1,
        paddingHorizontal: SPACING.xl,
        paddingTop: SPACING.md,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
        marginBottom: SPACING.xs,
    },
    subtitle: {
        fontSize: 16,
        color: COLORS.textSecondary,
        marginBottom: SPACING.xl,
    },
});

export default OnboardingLayout;
