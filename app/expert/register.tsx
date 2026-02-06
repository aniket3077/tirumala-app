import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, Stack } from 'expo-router';
import { Colors } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { API_URL } from '@/constants/api';
import axios from 'axios';

export default function ExpertRegisterScreen() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [experience, setExperience] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
            base64: true,
        });

        if (!result.canceled) {
            setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
        }
    };

    const handleRegister = async () => {
        if (!name || !email || !password || !specialty) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`${API_URL}/api/auth/register`, {
                name,
                email,
                password,
                title,
                specialty,
                experience,
                avatar: image,
                role: 'EXPERT'
            });

            if (response.data.token) {
                Alert.alert('Success', 'Application submitted successfully! You can now login.');
                router.replace('/expert/login');
            }
        } catch (error: any) {
            console.error('Expert Registration Error:', error);
            const msg = error.response?.data?.msg || 'Failed to submit application.';
            Alert.alert('Registration Failed', msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar style="light" />

            <LinearGradient colors={['#1a2e05', '#2f4f10']} style={styles.headerBackground}>
                <SafeAreaView>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.headerContent}>
                        <Text style={styles.headerTitle}>Join as Expert</Text>
                        <Text style={styles.headerSubtitle}>Share your knowledge with the farming community</Text>
                    </View>
                </SafeAreaView>
            </LinearGradient>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

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
                        <Text style={styles.avatarPickerText}>{image ? 'Change Photo' : 'Upload Profile Photo'}</Text>
                    </TouchableOpacity>

                    <View style={styles.card}>
                        <Text style={styles.sectionTitle}>Basic Information</Text>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Full Name *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="E.g. Dr. Ramesh Kumar"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Email Address *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="name@example.com"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Password *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Min 6 characters"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <View style={styles.divider} />
                        <Text style={styles.sectionTitle}>Professional Details</Text>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Professional Title</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="E.g. Senior Agronomist"
                                value={title}
                                onChangeText={setTitle}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Primary Specialty *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="E.g. Organic Farming, Soil Health"
                                value={specialty}
                                onChangeText={setSpecialty}
                            />
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Experience (Years)</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="E.g. 10+ years"
                                value={experience}
                                onChangeText={setExperience}
                            />
                        </View>

                        <TouchableOpacity
                            style={[styles.button, loading && styles.buttonDisabled]}
                            onPress={handleRegister}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <>
                                    <Text style={styles.buttonText}>Submit Application</Text>
                                    <Ionicons name="send" size={18} color="#fff" style={{ marginLeft: 8 }} />
                                </>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => router.push('/expert/login')}
                            style={styles.loginLink}
                        >
                            <Text style={styles.loginLinkText}>Already have an account? Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 40 }} />
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    headerBackground: { paddingBottom: 40, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
    backBtn: { padding: 12, marginLeft: 12, marginTop: 10 },
    headerContent: { alignItems: 'center', paddingHorizontal: 30 },
    headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
    headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', textAlign: 'center' },
    scrollContent: { padding: 20 },

    avatarPicker: { alignItems: 'center', marginTop: -50, marginBottom: 20 },
    avatarCircle: {
        width: 100, height: 100, borderRadius: 50, backgroundColor: '#fff',
        justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#fff',
        overflow: 'hidden', elevation: 8, shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 8
    },
    avatarImage: { width: '100%', height: '100%' },
    addIconSmall: {
        position: 'absolute', bottom: 5, right: 5, backgroundColor: Colors.light.primary,
        width: 24, height: 24, borderRadius: 12, justifyContent: 'center', alignItems: 'center',
        borderWidth: 2, borderColor: '#fff'
    },
    avatarPickerText: { marginTop: 10, fontSize: 14, fontWeight: '700', color: Colors.light.primary },

    card: { backgroundColor: '#fff', borderRadius: 24, padding: 24, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1a2e05', marginBottom: 16 },
    formGroup: { marginBottom: 18 },
    label: { fontSize: 13, fontWeight: '600', color: '#666', marginBottom: 8, textTransform: 'uppercase' },
    input: { backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#F3F4F6', borderRadius: 12, padding: 14, fontSize: 16, color: '#1F2937' },
    divider: { height: 1, backgroundColor: '#F3F4F6', marginVertical: 20 },

    button: {
        backgroundColor: Colors.light.primary, borderRadius: 14, paddingVertical: 16,
        alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginTop: 10,
        elevation: 4, shadowColor: Colors.light.primary, shadowOpacity: 0.3, shadowRadius: 10
    },
    buttonDisabled: { opacity: 0.7 },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
    loginLink: { marginTop: 20, alignItems: 'center' },
    loginLinkText: { color: '#666', fontSize: 14, fontWeight: '500' }
});
