import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Platform, KeyboardAvoidingView, Image } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/theme';
import { API_URL } from '@/constants/api';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
    const router = useRouter();
    const { login } = useAuth();
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
            console.log(`[API] Attempting login: ${email}`);
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.msg || 'Login failed');
            }

            // Save to AuthContext
            login(data.token, data.user);

            Alert.alert('Success', 'Welcome back!');

            // Redirect based on role
            if (data.user.role === 'EXPERT') {
                router.replace({
                    pathname: '/expert/dashboard',
                    params: {
                        expertId: data.user.id,
                        expertProfileId: data.user.profile?.id,
                        name: data.user.profile?.name,
                        token: data.token
                    }
                });
            } else {
                router.replace('/(tabs)');
            }

        } catch (error: any) {
            console.error('[API] Login Error:', error);
            Alert.alert('Login Failed', error.message || 'Server connection failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <LinearGradient
                colors={['#1B5E20', '#2E7D32']}
                style={styles.header}
            >
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <View style={styles.logoCircle}>
                    <Image
                        source={require('../../assets/images/tirumala_logo_final.png')}
                        style={{ width: 60, height: 60 }}
                        resizeMode="contain"
                    />
                </View>
                <Text style={styles.headerTitle}>Welcome Back</Text>
                <Text style={styles.headerSubtitle}>Login to your Tirumala account</Text>
            </LinearGradient>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.content}>
                <View style={styles.formCard}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email Address</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="name@example.com"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password</Text>
                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>
                    </View>

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
                        onPress={() => router.push('/auth/profile-setup')}
                        style={styles.registerLink}
                    >
                        <Text style={styles.registerText}>
                            Don't have an account? <Text style={styles.registerHighlight}>Register Now</Text>
                        </Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    header: { padding: 24, paddingTop: 60, paddingBottom: 60, alignItems: 'center', borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
    backBtn: { position: 'absolute', top: 50, left: 20, zIndex: 10, padding: 8, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 12 },
    logoCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 5 },
    headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
    headerSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginTop: 8 },
    content: { flex: 1, padding: 20, marginTop: -40 },
    formCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 6,
    },
    inputGroup: { marginBottom: 20 },
    label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 8 },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 16,
        paddingHorizontal: 16,
    },
    inputIcon: { marginRight: 12 },
    input: {
        flex: 1,
        paddingVertical: 16,
        fontSize: 16,
        color: '#333',
    },
    loginBtn: {
        backgroundColor: Colors.light.primary,
        borderRadius: 16,
        padding: 18,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: Colors.light.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    loginBtnDisabled: { opacity: 0.7 },
    loginBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    registerLink: { marginTop: 24, alignItems: 'center' },
    registerText: { color: '#666', fontSize: 14 },
    registerHighlight: { color: Colors.light.primary, fontWeight: 'bold' },
    expertLoginBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        padding: 10,
    },
    expertLoginText: {
        color: '#888',
        fontSize: 14,
        fontWeight: '500',
    }
});
