import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function CallExpertScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState('Connecting...');

    const expertName = params.expertName || 'Expert';

    // Simulate connection flow
    useEffect(() => {
        const t1 = setTimeout(() => setStatus('Ringing...'), 2000);
        const t2 = setTimeout(() => setStatus('Connected'), 5000);
        const t3 = setTimeout(() => {
            // In a real app, this would start a call layout.
            // For demo, we just stay "Connected" or go back.
        }, 8000);

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <LinearGradient
                colors={['#1B5E20', '#111']}
                style={StyleSheet.absoluteFillObject}
            />

            <View style={styles.content}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={require('../../assets/images/expert_1.png')} // Fallback/Placeholder if dynamic image not passed cleanly
                        style={styles.avatar}
                    />
                    <View style={[styles.ring, { borderColor: status === 'Connected' ? '#4CAF50' : 'rgba(255,255,255,0.2)' }]} />
                </View>

                <Text style={styles.name}>{expertName}</Text>
                <Text style={styles.status}>{status}</Text>
            </View>

            <View style={styles.controls}>
                <View style={styles.btnRound}>
                    <Ionicons name="mic-off" size={28} color="#fff" />
                </View>
                <View style={[styles.btnRound, { backgroundColor: '#F44336', width: 70, height: 70 }]}>
                    <Ionicons name="call" size={32} color="#fff" />
                </View>
                <View style={styles.btnRound}>
                    <Ionicons name="volume-high" size={28} color="#fff" />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingVertical: 80 },
    content: { alignItems: 'center' },
    avatarContainer: { marginBottom: 30, position: 'relative', justifyContent: 'center', alignItems: 'center' },
    avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: '#fff' },
    ring: {
        position: 'absolute',
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 2,
    },
    name: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
    status: { fontSize: 18, color: '#aaa', letterSpacing: 1 },

    controls: { flexDirection: 'row', width: '80%', justifyContent: 'space-around', alignItems: 'center' },
    btnRound: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
