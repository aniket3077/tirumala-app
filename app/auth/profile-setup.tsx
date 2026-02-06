import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

import { API_URL } from '@/constants/api';
import { useAuth } from '@/context/AuthContext';
const COMMON_CROPS = ['Wheat', 'Rice', 'Sugarcane', 'Cotton', 'Maize', 'Pulses', 'Vegetables'];

export default function ProfileSetupScreen() {
    const router = useRouter();
    const { mode } = useLocalSearchParams();
    const isUpdate = mode === 'update';
    const { login, user, token, refreshUser } = useAuth();

    // Get current profile data if updating
    const profile = user?.profile || user?.farmerProfile;
    const initialCrops = profile?.crops ? (typeof profile.crops === 'string' ? profile.crops.split(',').map((c: string) => c.trim()) : []) : [];

    const [email, setEmail] = useState(user?.email || '');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(profile?.fullName || profile?.name || '');
    const [phone, setPhone] = useState(profile?.phone || '');
    const [village, setVillage] = useState(profile?.village || profile?.location || '');
    const [selectedCrops, setSelectedCrops] = useState<string[]>(initialCrops);
    const [image, setImage] = useState<string | null>(profile?.avatar || profile?.profileImage || null);
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
            base64: true,
            allowsMultipleSelection: false,
        });

        if (!result.canceled) {
            // Check size if possible, or just use the base64
            setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
        }
    };

    const toggleCrop = (crop: string) => {
        if (selectedCrops.includes(crop)) {
            setSelectedCrops(selectedCrops.filter(c => c !== crop));
        } else {
            setSelectedCrops([...selectedCrops, crop]);
        }
    };

    const handleComplete = async () => {
        if (!name || !phone || (!isUpdate && (!email || !password))) {
            Alert.alert('Error', 'Required fields marked with * must be filled');
            return;
        }

        if (!isUpdate && password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }

        const payload = {
            ...(!isUpdate && { email, password }),
            fullName: name,
            phone,
            village,
            location: village,
            crops: selectedCrops.join(', '), // Convert array to comma-separated string
            avatar: image,
            role: 'FARMER'
        };

        setLoading(true);
        try {
            const endpoint = isUpdate ? `${API_URL}/api/auth/profile` : `${API_URL}/api/auth/register`;
            const method = isUpdate ? 'PUT' : 'POST';

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 25000);

            const headers: any = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };

            if (isUpdate && token) {
                headers['x-auth-token'] = token;
            }

            const response = await fetch(endpoint, {
                method,
                headers,
                body: JSON.stringify(payload),
                signal: controller.signal
            });

            clearTimeout(timeoutId);
            const data = await response.json();

            if (response.ok) {
                if (isUpdate) {
                    await refreshUser();
                    Alert.alert('Success', 'Profile updated successfully!');
                    router.back();
                } else {
                    console.log('[API] Registration Success');
                    login(data.token, data.user);
                    Alert.alert('Success', 'Profile setup complete!');
                    router.replace('/(tabs)');
                }
            } else {
                console.error('[API] Server Error:', data);
                Alert.alert('Error', data.msg || 'Action failed');
            }
        } catch (error: any) {
            console.error('[API] Error:', error);
            if (error.name === 'AbortError') {
                Alert.alert('Timeout', 'The server took too long to respond.');
            } else {
                Alert.alert('Network Error', 'Could not reach the server. Please check your internet connection.');
            }
        } finally {
            setLoading(false);
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

                        {/* Profile Image Pick */}
                        <TouchableOpacity style={styles.avatarPicker} onPress={pickImage} activeOpacity={0.8}>
                            <View style={styles.avatarCircle}>
                                {image ? (
                                    <Image source={{ uri: image }} style={styles.avatarImage} />
                                ) : (
                                    <Ionicons name="camera" size={32} color={Colors.light.primary} />
                                )}
                                <View style={styles.addIconSmall}>
                                    <Ionicons name="add" size={16} color="#fff" />
                                </View>
                            </View>
                            <Text style={styles.avatarPickerText}>{image ? 'Change Photo' : 'Upload Photo'}</Text>
                        </TouchableOpacity>

                        <View style={styles.card}>
                            {!isUpdate && (
                                <>
                                    <View style={styles.formGroup}>
                                        <Text style={styles.label}>Email Address *</Text>
                                        <View style={styles.inputContainer}>
                                            <Ionicons name="mail-outline" size={20} color="#999" style={styles.inputIcon} />
                                            <TextInput
                                                style={styles.input}
                                                placeholder="farmer@example.com"
                                                value={email}
                                                onChangeText={setEmail}
                                                autoCapitalize="none"
                                                keyboardType="email-address"
                                                placeholderTextColor="#999"
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.formGroup}>
                                        <Text style={styles.label}>Password *</Text>
                                        <View style={styles.inputContainer}>
                                            <Ionicons name="lock-closed-outline" size={20} color="#999" style={styles.inputIcon} />
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Min 6 characters"
                                                value={password}
                                                onChangeText={setPassword}
                                                secureTextEntry
                                                placeholderTextColor="#999"
                                            />
                                        </View>
                                    </View>
                                </>
                            )}

                            <View style={styles.formGroup}>
                                <Text style={styles.label}>Full Name *</Text>
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
                                <Text style={styles.label}>Phone Number *</Text>
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
                            style={[styles.button, (!name || !phone || (!isUpdate && (!email || !password))) && styles.buttonDisabled]}
                            onPress={handleComplete}
                            disabled={!name || !phone || (!isUpdate && (!email || !password)) || loading}
                        >
                            <LinearGradient
                                colors={(!name || !phone || (!isUpdate && (!email || !password))) ? ['#ccc', '#bbb'] : [Colors.light.primary, '#43A047']}
                                style={styles.buttonGradient}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                            >
                                {loading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <>
                                        <Text style={styles.buttonText}>{isUpdate ? 'Update Profile' : 'Complete Setup'}</Text>
                                        <Ionicons name={isUpdate ? "save-outline" : "chevron-forward"} size={20} color="#fff" />
                                    </>
                                )}
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
    avatarPicker: {
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E8F5E9',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    addIconSmall: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.light.primary,
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    avatarPickerText: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: '700',
        color: '#fff',
        textShadowColor: 'rgba(0,0,0,0.2)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
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
