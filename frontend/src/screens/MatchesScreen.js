import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS, SPACING } from '../utils/theme';
import api from '../services/api';

const MatchesScreen = ({ navigation }) => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMatches();
    }, []);

    const fetchMatches = async () => {
        try {
            const { data } = await api.get('/matches');
            setMatches(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const renderMatchItem = ({ item }) => (
        <TouchableOpacity
            style={styles.matchItem}
            onPress={() => navigation.navigate('Chat', { matchId: item._id, otherUser: item.otherUser })}
        >
            <Image
                source={{ uri: item.otherUser.photos?.[0] || 'https://via.placeholder.com/100' }}
                style={styles.avatar}
            />
            <View style={styles.matchInfo}>
                <Text style={styles.matchName}>{item.otherUser.name}</Text>
                <Text style={styles.lastMessage} numberOfLines={1}>
                    Click to start chatting!
                </Text>
            </View>
            <Text style={styles.time}>Just now</Text>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Matches</Text>
            {matches.length === 0 ? (
                <View style={styles.center}>
                    <Text style={styles.emptyText}>No matches yet. Keep swiping!</Text>
                </View>
            ) : (
                <FlatList
                    data={matches}
                    keyExtractor={(item) => item._id}
                    renderItem={renderMatchItem}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: 60,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: SPACING.lg,
        marginBottom: SPACING.md,
        color: COLORS.textPrimary,
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    list: {
        paddingHorizontal: SPACING.lg,
    },
    matchItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING.md,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.surfaceVariant,
    },
    matchInfo: {
        flex: 1,
        marginLeft: SPACING.md,
    },
    matchName: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.textPrimary,
    },
    lastMessage: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginTop: 2,
    },
    time: {
        fontSize: 12,
        color: COLORS.textTertiary,
    },
    emptyText: {
        fontSize: 16,
        color: COLORS.textSecondary,
    },
});

export default MatchesScreen;
