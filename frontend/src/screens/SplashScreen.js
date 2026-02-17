import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Image, Dimensions } from 'react-native';
import { COLORS } from '../utils/theme';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
    const fadeAnim = new Animated.Value(0);
    const scaleAnim = new Animated.Value(0.8);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
            })
        ]).start();

        const timer = setTimeout(() => {
            navigation.replace('AuthIntro');
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={{
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }]
            }}>
                <View style={styles.logoCircle}>
                    <Image
                        source={require('../../assets/icon.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoCircle: {
        width: width * 0.4,
        height: width * 0.4,
        borderRadius: width * 0.2,
        backgroundColor: COLORS.surfaceVariant,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 10,
    },
    logo: {
        width: '70%',
        height: '70%',
    }
});

export default SplashScreen;
