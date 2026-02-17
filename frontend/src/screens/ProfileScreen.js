import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Settings, Edit, LogOut } from 'lucide-react-native';
import { COLORS, SPACING } from '../utils/theme';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
    const { user, logoutAuth } = useContext(AuthContext);

    if (!user) return null;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profile</Text>
                <TouchableOpacity>
                    <Settings color={COLORS.textPrimary} size={24} />
                </TouchableOpacity>
            </View>

            <View style={styles.profileInfo}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: user.photos?.[0] || 'https://via.placeholder.com/150?text=Profile' }}
                        style={styles.avatar}
                    />
                    <TouchableOpacity style={styles.editButton}>
                        <Edit color={COLORS.white} size={16} />
                    </TouchableOpacity>
                </View>

                <Text style={styles.name}>{user.name}, {user.age}</Text>
                <Text style={styles.city}>{user.city}</Text>
            </View>

            <View style={styles.bioSection}>
                <Text style={styles.sectionTitle}>About Me</Text>
                <Text style={styles.bioText}>
                    {user.bio || "No bio added yet. Tell people something about yourself!"}
                </Text>
            </View>

            <View style={styles.interestsSection}>
                <Text style={styles.sectionTitle}>Interests</Text>
                <View style={styles.interestsContainer}>
                    {user.interests?.length > 0 ? (
                        user.interests.map((interest, index) => (
                            <View key={index} style={styles.interestTag}>
                                <Text style={styles.interestText}>{interest}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.emptyText}>Add interests to find better matches</Text>
                    )}
                </View>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={logoutAuth}>
                <LogOut color={COLORS.error} size={20} />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING.lg,
        paddingTop: 60,
        marginBottom: SPACING.lg,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    profileInfo: {
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    imageContainer: {
        position: 'relative',
        marginBottom: SPACING.md,
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: COLORS.primary,
    },
    editButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.primary,
        padding: 8,
        borderRadius: 20,
        borderWidth: 3,
        borderColor: COLORS.background,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.textPrimary,
    },
    city: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginTop: 4,
    },
    bioSection: {
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.xl,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.textPrimary,
        marginBottom: SPACING.sm,
    },
    bioText: {
        fontSize: 16,
        color: COLORS.textSecondary,
        lineHeight: 22,
    },
    interestsSection: {
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.xl,
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    interestTag: {
        backgroundColor: COLORS.surfaceVariant,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    interestText: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: SPACING.lg,
        marginTop: SPACING.xl,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    logoutText: {
        color: COLORS.error,
        fontSize: 16,
        fontWeight: '600',
        marginLeft: SPACING.sm,
    },
    emptyText: {
        color: COLORS.textTertiary,
        fontStyle: 'italic',
    }
});

export default ProfileScreen;
