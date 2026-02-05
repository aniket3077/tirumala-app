import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/theme';

const TICKETS = [
    { id: '1023', subject: 'Water Pump Issue', date: '20 Oct 2025', status: 'Resolved' },
    { id: '1024', subject: 'Seed Quality Inquiry', date: '21 Oct 2025', status: 'Pending' },
    { id: '1025', subject: 'Subsidy Application', date: '22 Oct 2025', status: 'In Progress' },
];

export default function TicketTrackingScreen() {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'My Tickets', headerTintColor: Colors.light.primary }} />
            <FlatList
                data={TICKETS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.row}>
                            <Text style={styles.id}>Ticket #{item.id}</Text>
                            <View style={[styles.badge,
                            item.status === 'Resolved' ? styles.bgSuccess :
                                item.status === 'Pending' ? styles.bgWarn : styles.bgInfo
                            ]}>
                                <Text style={[styles.badgeText,
                                item.status === 'Resolved' ? styles.textSuccess :
                                    item.status === 'Pending' ? styles.textWarn : styles.textInfo
                                ]}>{item.status}</Text>
                            </View>
                        </View>
                        <Text style={styles.subject}>{item.subject}</Text>
                        <Text style={styles.date}>Created on: {item.date}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 1 },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    id: { fontWeight: 'bold', color: '#666' },
    subject: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
    date: { fontSize: 12, color: '#999' },
    badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
    badgeText: { fontSize: 12, fontWeight: 'bold' },
    bgSuccess: { backgroundColor: '#E8F5E9' },
    textSuccess: { color: '#2E7D32' },
    bgWarn: { backgroundColor: '#FFF8E1' },
    textWarn: { color: '#FBC02D' },
    bgInfo: { backgroundColor: '#E3F2FD' },
    textInfo: { color: '#1976D2' },
});
