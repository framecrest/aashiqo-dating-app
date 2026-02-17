import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { COLORS, SPACING } from '../utils/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
} from 'react-native-reanimated';
import { Apple } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const AnimatedBlob = ({ color, size, initialPos, duration }) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);

    useEffect(() => {
        translateX.value = withRepeat(
            withSequence(
                withTiming(100, { duration }),
                withTiming(-100, { duration })
            ),
            -1,
            true
        );
        translateY.value = withRepeat(
            withSequence(
                withTiming(-80, { duration: duration * 1.2 }),
                withTiming(80, { duration: duration * 1.2 })
            ),
            -1,
            true
        );
        scale.value = withRepeat(
            withSequence(
                withTiming(1.4, { duration: duration * 0.8 }),
                withTiming(0.7, { duration: duration * 0.8 })
            ),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value }
        ],
    }));

    return (
        <Animated.View style={[
            styles.blob,
            {
                backgroundColor: color,
                width: size,
                height: size,
                borderRadius: size / 2,
                left: initialPos.x,
                top: initialPos.y,
            },
            animatedStyle
        ]} />
    );
};

const AuthIntroScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Animated Gradient Background */}
            <View style={styles.backgroundContainer}>
                <AnimatedBlob
                    color="#FF2D55"
                    size={width * 1.2}
                    initialPos={{ x: -width * 0.3, y: height * 0.05 }}
                    duration={8000}
                />
                <AnimatedBlob
                    color="#FF7EB3"
                    size={width}
                    initialPos={{ x: width * 0.3, y: -height * 0.1 }}
                    duration={10000}
                />
                <AnimatedBlob
                    color="#FFD600"
                    size={width * 0.5}
                    initialPos={{ x: width * 0.1, y: height * 0.2 }}
                    duration={12000}
                />
                <AnimatedBlob
                    color="#FFFFFF"
                    size={width * 0.8}
                    initialPos={{ x: width * 0.2, y: height * 0.1 }}
                    duration={9000}
                />
                <BlurView
                    intensity={Platform.OS === 'ios' ? 90 : 100}
                    style={StyleSheet.absoluteFill}
                    tint="dark"
                />
            </View>

            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.6)', '#000000']}
                style={styles.gradientOverlay}
            />

            <View style={styles.content}>
                <View style={styles.textSection}>
                    <Text style={styles.heading}>
                        <Text style={styles.scriptText}>Let's</Text> help you{'\n'}
                        meet someone{'\n'}
                        who truly gets <Text style={styles.youText}>you</Text>
                    </Text>
                    <Text style={styles.subheading}>
                        Find genuine connections built on shared values, interests, and goals.
                    </Text>
                </View>

                <View style={styles.buttonSection}>
                    <TouchableOpacity
                        style={styles.emailButton}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.emailButtonText}>Continue with Email</Text>
                    </TouchableOpacity>

                    <View style={styles.dividerRow}>
                        <View style={styles.divider} />
                        <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
                        <View style={styles.divider} />
                    </View>

                    <TouchableOpacity style={styles.socialButton}>
                        <Text style={styles.socialButtonText}>Continue With Apple</Text>
                        <Apple size={22} color={COLORS.white} fill={COLORS.white} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.socialButton}>
                        <Text style={styles.socialButtonText}>Continue With Google</Text>
                        <View style={styles.googleIconContainer}>
                            <Text style={styles.googleIconText}>G</Text>
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.footerText}>
                        By continuing, you agree to Aashiqo's{'\n'}
                        <Text style={styles.footerLink}>Terms of Service</Text> and <Text style={styles.footerLink}>Privacy Policy</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    backgroundContainer: {
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden',
    },
    blob: {
        position: 'absolute',
        opacity: 0.8,
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
    },
    content: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: SPACING.xl,
        paddingBottom: 40,
    },
    textSection: {
        marginBottom: SPACING.xl,
    },
    heading: {
        fontSize: 38,
        fontWeight: 'bold',
        color: COLORS.white,
        lineHeight: 48,
        letterSpacing: -1,
    },
    scriptText: {
        fontSize: 56,
        fontFamily: Platform.OS === 'ios' ? 'Snell Roundhand' : 'serif',
        fontWeight: '200',
    },
    youText: {
        color: '#FF4B2B',
        fontStyle: 'italic',
        fontFamily: Platform.OS === 'ios' ? 'Snell Roundhand' : 'serif',
    },
    subheading: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.7)',
        marginTop: SPACING.md,
        lineHeight: 22,
        fontWeight: '500',
    },
    buttonSection: {
        width: '100%',
    },
    emailButton: {
        backgroundColor: COLORS.white,
        height: 58,
        borderRadius: 29,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.lg,
    },
    emailButtonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: '700',
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SPACING.lg,
        paddingHorizontal: SPACING.sm,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.15)',
    },
    dividerText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 11,
        marginHorizontal: SPACING.md,
        fontWeight: '800',
        letterSpacing: 1,
    },
    socialButton: {
        backgroundColor: '#161618',
        height: 58,
        borderRadius: 29,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.md,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    socialButtonText: {
        color: COLORS.white,
        fontSize: 17,
        fontWeight: '600',
        marginRight: 12,
    },
    googleIconContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    googleIconText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: '900',
    },
    footerText: {
        textAlign: 'center',
        color: 'rgba(255,255,255,0.4)',
        fontSize: 12,
        marginTop: SPACING.lg,
        lineHeight: 18,
    },
    footerLink: {
        color: 'rgba(255,255,255,0.6)',
        textDecorationLine: 'underline',
        fontWeight: '600',
    }
});

export default AuthIntroScreen;
