import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

export default function VideoGuidanceScreen() {
    return (
        <ScrollView style={styles.container}>
            <Stack.Screen options={{ title: 'Video Guidance', headerTintColor: Colors.light.primary }} />
            {[1, 2, 3, 4].map((i) => (
                <View key={i} style={styles.card}>
                    <View style={styles.thumbnail}>
                        <Ionicons name="play-circle" size={50} color="#fff" />
                    </View>
                    <Text style={styles.videoTitle}>Farming Technique #{i}</Text>
                    <Text style={styles.videoDesc}>Learn how to improve yield.</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 16 },
    card: { backgroundColor: '#fff', marginBottom: 16, borderRadius: 12, overflow: 'hidden', elevation: 2 },
    thumbnail: { height: 180, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
    videoTitle: { fontWeight: 'bold', fontSize: 16, padding: 12, paddingBottom: 4 },
    videoDesc: { color: '#666', paddingHorizontal: 12, paddingBottom: 12 },
});
