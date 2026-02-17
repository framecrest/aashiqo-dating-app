import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, Text } from 'react-native';
import OnboardingLayout from '../../components/onboarding/OnboardingLayout';
import NextButton from '../../components/onboarding/NextButton';
import { OnboardingContext } from '../../context/OnboardingContext';
import { COLORS, SPACING } from '../../utils/theme';
import * as ImagePicker from 'expo-image-picker';
import { Plus, X } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const GRID_SIZE = (width - SPACING.xl * 2 - SPACING.md * 2) / 3;

const PhotoUploadScreen = ({ navigation }) => {
    const { onboardingData, updateOnboardingData } = useContext(OnboardingContext);
    const [photos, setPhotos] = useState(onboardingData.photos || []);

    const pickImage = async () => {
        if (photos.length >= 6) return;

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 5],
            quality: 0.7,
        });

        if (!result.canceled) {
            setPhotos([...photos, result.assets[0].uri]);
        }
    };

    const removePhoto = (index) => {
        setPhotos(photos.filter((_, i) => i !== index));
    };

    const handleNext = () => {
        if (photos.length >= 1) {
            updateOnboardingData({ photos });
            navigation.navigate('Bio');
        }
    };

    const renderItem = ({ index }) => {
        const photo = photos[index];
        if (photo) {
            return (
                <View style={styles.photoContainer}>
                    <Image source={{ uri: photo }} style={styles.image} />
                    <TouchableOpacity
                        style={styles.removeBtn}
                        onPress={() => removePhoto(index)}
                    >
                        <X size={16} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            );
        }

        return (
            <TouchableOpacity
                style={styles.placeholder}
                onPress={pickImage}
            >
                <Plus size={32} color={COLORS.gray} />
            </TouchableOpacity>
        );
    };

    return (
        <OnboardingLayout
            title="Add your photos"
            subtitle="Show the world who you are. (Min 1, Max 6)"
            currentStep={8}
            onBack={() => navigation.goBack()}
        >
            <View style={styles.grid}>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <View key={i} style={styles.gridItem}>
                        {renderItem({ index: i })}
                    </View>
                ))}
            </View>

            <NextButton
                onPress={handleNext}
                disabled={photos.length < 1}
            />
        </OnboardingLayout>
    );
};

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -SPACING.sm,
        marginTop: SPACING.lg,
    },
    gridItem: {
        width: '33.33%',
        padding: SPACING.sm,
        aspectRatio: 0.8,
    },
    photoContainer: {
        flex: 1,
        borderRadius: 12,
        overflow: 'hidden',
    },
    image: {
        flex: 1,
    },
    placeholder: {
        flex: 1,
        backgroundColor: COLORS.surfaceVariant,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: COLORS.border,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeBtn: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 4,
    },
});

export default PhotoUploadScreen;
