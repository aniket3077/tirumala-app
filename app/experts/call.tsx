import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function ConsultantCallScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState('Connecting...');

    const expertName = params.expertName || 'Expert';

    // Simulate connection flow
    useEffect(() => {
        const t1 = setTimeout(() => setStatus('Ringing...'), 2000);
        const t2 = setTimeout(() => setStatus('Connected'), 5000);

        return () => { clearTimeout(t1); clearTimeout(t2); };
    }, []);

    const endCall = () => {
        router.back();
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <LinearGradient
                colors={['#0F2027', '#203A43', '#2C5364']}
                style={StyleSheet.absoluteFillObject}
            />

            <View style={styles.content}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={require('../../assets/images/expert_1.png')}
                        style={styles.avatar}
                    />
                    <View style={[styles.ring, { borderColor: status === 'Connected' ? '#4CAF50' : 'rgba(255,255,255,0.2)' }]} />
                    <View style={[styles.ringOuter, { borderColor: status === 'Connected' ? '#4CAF50' : 'rgba(255,255,255,0.1)' }]} />
                </View>

                <Text style={styles.name}>{expertName}</Text>
                <Text style={styles.status}>{status}</Text>

                {status === 'Connected' && (
                    <Text style={styles.timer}>00:15</Text>
                )}
            </View>

            <View style={styles.controls}>
                <TouchableOpacity style={styles.btnRound}>
                    <Ionicons name="mic-off" size={28} color="#fff" />
                    <Text style={styles.btnText}>Mute</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.btnRound, styles.btnEnd]} onPress={endCall}>
                    <Ionicons name="call" size={32} color="#fff" />
                    <Text style={[styles.btnText, { marginTop: 4 }]}>End</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnRound}>
                    <Ionicons name="volume-high" size={28} color="#fff" />
                    <Text style={styles.btnText}>Speaker</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'space-between', alignItems: 'center', paddingVertical: 80 },
    content: { alignItems: 'center', marginTop: 40 },
    avatarContainer: { marginBottom: 30, position: 'relative', justifyContent: 'center', alignItems: 'center' },
    avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: '#fff', zIndex: 10 },

    ring: {
        position: 'absolute',
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 2,
    },
    ringOuter: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 1,
        opacity: 0.5,
    },

    name: { fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
    status: { fontSize: 18, color: '#aaa', letterSpacing: 1 },
    timer: { fontSize: 20, color: '#fff', marginTop: 10, fontWeight: '300' },

    controls: { flexDirection: 'row', width: '90%', justifyContent: 'space-around', alignItems: 'flex-end', marginBottom: 20 },
    btnRound: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
    },
    btnEnd: {
        backgroundColor: '#F44336',
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    btnText: { color: '#fff', fontSize: 12, marginTop: 8 },
});
