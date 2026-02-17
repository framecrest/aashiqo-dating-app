import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Heart, X, Info } from 'lucide-react-native';
import { COLORS, SPACING } from '../utils/theme';
import api from '../services/api';

const SwipeScreen = () => {
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        try {
            const { data } = await api.get('/users/discover');
            setProfiles(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async () => {
        const currentProfile = profiles[currentIndex];
        try {
            await api.post('/matches/like', { likedUserId: currentProfile._id });
            nextProfile();
        } catch (error) {
            console.error(error);
        }
    };

    const handlePass = () => {
        nextProfile();
    };

    const nextProfile = () => {
        if (currentIndex < profiles.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setProfiles([]); // No more profiles
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    if (profiles.length === 0 || currentIndex >= profiles.length) {
        return (
            <View style={styles.center}>
                <Text style={styles.noProfilesText}>No more profiles to show!</Text>
                <TouchableOpacity style={styles.reloadButton} onPress={fetchProfiles}>
                    <Text style={styles.reloadButtonText}>Refresh</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const profile = profiles[currentIndex];

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image
                    source={{ uri: profile.photos?.[0] || 'https://via.placeholder.com/400x600?text=No+Photo' }}
                    style={styles.image}
                />
                <View style={styles.overlay}>
                    <View style={styles.infoRow}>
                        <Text style={styles.name}>{profile.name}, {profile.age}</Text>
                        <TouchableOpacity>
                            <Info color={COLORS.white} size={24} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.city}>{profile.city}</Text>
                </View>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity style={[styles.actionButton, styles.passButton]} onPress={handlePass}>
                    <X color={COLORS.error} size={32} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionButton, styles.likeButton]} onPress={handleLike}>
                    <Heart color={COLORS.success} size={32} fill={COLORS.success} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        padding: SPACING.md,
        paddingTop: 50,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.background,
    },
    card: {
        flex: 1,
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: COLORS.surfaceVariant,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: SPACING.lg,
        paddingTop: SPACING.xl * 2,
        backgroundColor: 'rgba(0,0,0,0.6)', // Darker gradient feel
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        color: COLORS.white,
        fontSize: 32,
        fontWeight: 'bold',
    },
    city: {
        color: COLORS.textSecondary,
        fontSize: 18,
        marginTop: 4,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: SPACING.xl,
    },
    actionButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: COLORS.surfaceVariant,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    noProfilesText: {
        fontSize: 18,
        color: COLORS.textSecondary,
        marginBottom: SPACING.md,
    },
    reloadButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        borderRadius: 20,
    },
    reloadButtonText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
});

export default SwipeScreen;
