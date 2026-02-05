import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

const NOTIFICATIONS = [
    { id: '1', title: 'Heavy Rain Alert', message: 'Heavy rainfall expected in Rampur tomorrow. Secure your crops immediately.', time: '2h ago', type: 'alert' },
    { id: '2', title: 'Ticket Resolved', message: 'Your ticket #1023 regarding the water pump issue has been technically resolved by our team.', time: '5h ago', type: 'success' },
    { id: '3', title: 'New Subsidy', message: 'Government has announced a new 50% subsidy scheme on solar pumps. Apply before 30th Nov.', time: '1d ago', type: 'info' },
];

export default function NotificationsScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: 'Notifications',
                    headerTintColor: Colors.light.primary,
                    headerRight: () => (
                        <TouchableOpacity>
                            <Text style={styles.markRead}>Mark all read</Text>
                        </TouchableOpacity>
                    )
                }}
            />

            <FlatList
                data={NOTIFICATIONS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card} activeOpacity={0.7}>
                        <View style={[styles.iconBox, {
                            backgroundColor: item.type === 'alert' ? '#FFEBEE' : item.type === 'success' ? '#E8F5E9' : '#E3F2FD',
                            borderColor: item.type === 'alert' ? '#EF9A9A' : item.type === 'success' ? '#A5D6A7' : '#90CAF9'
                        }]}>
                            <Ionicons
                                name={item.type === 'alert' ? 'warning' : item.type === 'success' ? 'checkmark-done' : 'information'}
                                size={20}
                                color={item.type === 'alert' ? '#D32F2F' : item.type === 'success' ? '#2E7D32' : '#1976D2'}
                            />
                        </View>
                        <View style={styles.content}>
                            <View style={styles.header}>
                                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                                <Text style={styles.time}>{item.time}</Text>
                            </View>
                            <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
                        </View>
                        {item.type !== 'success' && <View style={styles.dot} />}
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    markRead: { color: Colors.light.primary, fontSize: 14, fontWeight: '600' },
    list: { padding: 16 },
    card: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        alignItems: 'flex-start',
    },
    iconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
        borderWidth: 1,
    },
    content: { flex: 1 },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4, alignItems: 'center' },
    title: { fontSize: 15, fontWeight: 'bold', color: '#111', flex: 1, marginRight: 8 },
    message: { fontSize: 13, color: '#666', lineHeight: 18 },
    time: { fontSize: 11, color: '#999', fontWeight: '500' },
    dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.light.primary, marginLeft: 8, marginTop: 6 },
});
