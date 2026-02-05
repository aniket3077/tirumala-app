import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const COMMON_CROPS = ['Wheat', 'Rice', 'Sugarcane', 'Cotton', 'Maize', 'Pulses', 'Vegetables'];

export default function ProfileSetupScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [village, setVillage] = useState('');
    const [selectedCrops, setSelectedCrops] = useState<string[]>([]);

    const toggleCrop = (crop: string) => {
        if (selectedCrops.includes(crop)) {
            setSelectedCrops(selectedCrops.filter(c => c !== crop));
        } else {
            setSelectedCrops([...selectedCrops, crop]);
        }
    };

    const handleComplete = () => {
        // Validate and save
        if (name && phone) {
            router.replace('/(tabs)');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <LinearGradient colors={[Colors.light.primary, '#1B5E20']} style={styles.headerBackground} />

            <SafeAreaView style={styles.safeArea}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                        <View style={styles.header}>
                            <View style={styles.iconBox}>
                                <Ionicons name="person" size={24} color={Colors.light.primary} />
                            </View>
                            <Text style={styles.title}>Your Profile</Text>
                            <Text style={styles.subtitle}>Help us customize your experience.</Text>
                        </View>

                        <View style={styles.card}>
                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Full Name</Text>
                                <View style={styles.inputContainer}>
                                    <Ionicons name="person-outline" size={20} color="#999" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your name"
                                        value={name}
                                        onChangeText={setName}
                                        placeholderTextColor="#999"
                                    />
                                </View>
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Phone Number</Text>
                                <View style={styles.inputContainer}>
                                    <Ionicons name="call-outline" size={20} color="#999" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="10-digit mobile number"
                                        value={phone}
                                        onChangeText={setPhone}
                                        keyboardType="phone-pad"
                                        placeholderTextColor="#999"
                                        maxLength={10}
                                    />
                                </View>
                            </View>

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Village / City</Text>
                                <View style={styles.inputContainer}>
                                    <Ionicons name="location-outline" size={20} color="#999" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="e.g. Rampur"
                                        value={village}
                                        onChangeText={setVillage}
                                        placeholderTextColor="#999"
                                    />
                                </View>
                            </View>
                        </View>

                        <Text style={styles.sectionTitle}>Crops You Grow</Text>
                        <View style={styles.chipContainer}>
                            {COMMON_CROPS.map((crop) => (
                                <TouchableOpacity
                                    key={crop}
                                    style={[
                                        styles.chip,
                                        selectedCrops.includes(crop) && styles.chipSelected
                                    ]}
                                    onPress={() => toggleCrop(crop)}
                                    activeOpacity={0.7}
                                >
                                    <Text style={[
                                        styles.chipText,
                                        selectedCrops.includes(crop) && styles.chipTextSelected
                                    ]}>
                                        {crop}
                                    </Text>
                                    {selectedCrops.includes(crop) &&
                                        <Ionicons name="checkmark" size={16} color="#fff" style={{ marginLeft: 4 }} />
                                    }
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity
                            style={[styles.button, (!name || !phone) && styles.buttonDisabled]}
                            onPress={handleComplete}
                            disabled={!name || !phone}
                        >
                            <LinearGradient
                                colors={(!name || !phone) ? ['#ccc', '#bbb'] : [Colors.light.primary, '#43A047']}
                                style={styles.buttonGradient}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            >
                                <Text style={styles.buttonText}>Complete Setup</Text>
                                <Ionicons name="chevron-forward" size={20} color="#fff" />
                            </LinearGradient>
                        </TouchableOpacity>

                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    headerBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 250,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        padding: 24,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 10,
    },
    iconBox: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#E8F5E9',
        textAlign: 'center',
        opacity: 0.9,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        paddingBottom: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
        elevation: 3,
        marginBottom: 24,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 13,
        fontWeight: '600',
        color: '#666',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginLeft: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        backgroundColor: '#F9F9F9',
        paddingHorizontal: 12,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 14,
        fontSize: 16,
        color: '#333',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        marginLeft: 4,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 30,
    },
    chip: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginRight: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    chipSelected: {
        backgroundColor: Colors.light.primary,
        borderColor: Colors.light.primary,
        shadowColor: Colors.light.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 2,
    },
    chipText: {
        color: '#666',
        fontSize: 14,
        fontWeight: '500',
    },
    chipTextSelected: {
        color: '#fff',
        fontWeight: '600',
    },
    button: {
        borderRadius: 30,
        overflow: 'hidden',
        shadowColor: Colors.light.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
        marginBottom: 20,
    },
    buttonDisabled: {
        shadowOpacity: 0,
        elevation: 0,
    },
    buttonGradient: {
        paddingVertical: 18,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 8,
    },
});
