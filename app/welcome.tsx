import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <Stack.Screen options={{ headerShown: false }} />

            {/* Background Decoration */}
            <View style={styles.circle1} />
            <View style={styles.circle2} />

            <View style={styles.content}>
                <Image
                    source={require('../assets/images/tirumala_logo_final.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <View style={styles.textContainer}>
                    <Text style={styles.title}>Tirumala Agri</Text>
                    <Text style={styles.subtitle}>Your trusted partner in sustainable farming and expert agricultural guidance.</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.primaryBtn}
                    onPress={() => router.push('/language-selection')}
                    activeOpacity={0.8}
                >
                    <LinearGradient
                        colors={['#2E7D32', '#1B5E20']}
                        style={styles.gradient}
                    >
                        <Text style={styles.primaryBtnText}>Get Started</Text>
                        <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={() => router.push('/auth/login')}
                    activeOpacity={0.7}
                >
                    <Text style={styles.secondaryBtnText}>
                        Already have an account? <Text style={{ color: '#2E7D32', fontWeight: 'bold' }}>Login</Text>
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    circle1: {
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: '#E8F5E9',
        opacity: 0.5,
    },
    circle2: {
        position: 'absolute',
        bottom: 100,
        left: -50,
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#F1F8E9',
        opacity: 0.6,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    logo: {
        width: width * 0.7,
        height: width * 0.7,
        marginBottom: 20,
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#1B5E20',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
    },
    footer: {
        padding: 30,
        paddingBottom: 50,
    },
    primaryBtn: {
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#2E7D32',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    gradient: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 18,
    },
    primaryBtnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    secondaryBtn: {
        paddingVertical: 14,
        alignItems: 'center',
    },
    secondaryBtnText: {
        color: '#666',
        fontSize: 15,
    },
    expertBtn: {
        marginTop: 20,
        alignSelf: 'center',
        padding: 10,
    },
    expertBtnText: {
        color: '#999',
        fontSize: 13,
        fontWeight: '500',
        textDecorationLine: 'underline',
    }
});
