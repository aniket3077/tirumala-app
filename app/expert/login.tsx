import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/theme';
import { API_URL } from '@/constants/api';

export default function ExpertLoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            console.log(`Connecting to ${API_URL}/api/auth/login...`);
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Login failed');
            }

            if (data.user.role !== 'EXPERT') {
                throw new Error('This login is restricted to Experts.');
            }

            // Navigate to Dashboard with params
            router.replace({
                pathname: '/expert/dashboard',
                params: {
                    expertId: data.user.id,
                    expertProfileId: data.user.profile?.id,
                    name: data.user.profile?.name,
                    token: data.token
                }
            });

        } catch (error: any) {
            console.error(error);
            Alert.alert('Login Failed', error.message || 'Server connection failed');
        } finally {
            setLoading(false);
        }
    };

    const fillDemo = () => {
        setEmail('expert@demo.com');
        setPassword('Expert@123');
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <LinearGradient
                colors={['#1a2e05', '#2f4f10']}
                style={styles.header}
            >
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Expert Portal</Text>
                <Text style={styles.headerSubtitle}>Login to manage your consultations</Text>
            </LinearGradient>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.content}>
                <View style={styles.formCard}>
                    <Text style={styles.label}>Email Address</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="expert@example.com"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <Text style={styles.label}>Password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="••••••••"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity onPress={fillDemo} style={styles.demoLink}>
                        <Text style={styles.demoText}>Use Demo Credentials</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : (
                            <Text style={styles.loginBtnText}>Login</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push('/expert/register')}
                        style={styles.registerLink}
                    >
                        <Text style={styles.registerLinkText}>New Expert? <Text style={{ color: Colors.light.primary, fontWeight: '700' }}>Apply to Join</Text></Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { padding: 24, paddingTop: 60, paddingBottom: 40 },
    backBtn: { position: 'absolute', top: 50, left: 20, zIndex: 10 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
    headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginTop: 8 },
    content: { flex: 1, padding: 20, marginTop: -30 },
    formCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8, marginTop: 16 },
    input: {
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
    },
    demoLink: { alignSelf: 'flex-end', marginTop: 12 },
    demoText: { color: Colors.light.primary, fontSize: 12, fontWeight: '600' },
    loginBtn: {
        backgroundColor: Colors.light.primary || '#2f4f10',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 32,
    },
    loginBtnDisabled: { opacity: 0.7 },
    loginBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    registerLink: { marginTop: 24, alignItems: 'center' },
    registerLinkText: { color: '#666', fontSize: 14, fontWeight: '500' },
});
