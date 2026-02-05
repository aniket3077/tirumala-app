import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/theme';

const TRANSACTIONS = [
    { id: '1', title: 'Added to Wallet', date: 'Today, 10:30 AM', amount: '+₹200', type: 'credit' },
    { id: '2', title: 'Consultation - Dr. Gupta', date: 'Yesterday, 4:15 PM', amount: '-₹50', type: 'debit' },
    { id: '3', title: 'Weather Alert Subscription', date: '20 Jan, 9:00 AM', amount: '-₹20', type: 'debit' },
    { id: '4', title: 'Added to Wallet', date: '15 Jan, 2:30 PM', amount: '+₹500', type: 'credit' },
    { id: '5', title: 'Soil Test Report', date: '10 Jan, 11:00 AM', amount: '-₹150', type: 'debit' },
];

export default function WalletScreen() {
    const router = useRouter();

    const renderTransaction = ({ item }: { item: any }) => (
        <View style={styles.txnItem}>
            <View style={[styles.txnIcon, { backgroundColor: item.type === 'credit' ? '#E8F5E9' : '#FFEBEE' }]}>
                <Ionicons
                    name={item.type === 'credit' ? 'arrow-down' : 'arrow-up'}
                    size={20}
                    color={item.type === 'credit' ? '#4CAF50' : '#F44336'}
                />
            </View>
            <View style={styles.txnInfo}>
                <Text style={styles.txnTitle}>{item.title}</Text>
                <Text style={styles.txnDate}>{item.date}</Text>
            </View>
            <Text style={[styles.txnAmount, { color: item.type === 'credit' ? '#4CAF50' : '#F44336' }]}>
                {item.amount}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Balance Card */}
                <LinearGradient
                    colors={['#1B5E20', '#2E7D32', '#43A047']}
                    style={styles.card}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={styles.cardTop}>
                        <View>
                            <Text style={styles.label}>Available Balance</Text>
                            <Text style={styles.balance}>₹480.00</Text>
                        </View>
                        <View style={styles.walletIconBg}>
                            <Ionicons name="wallet" size={24} color="#fff" />
                        </View>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.cardActions}>
                        <TouchableOpacity style={styles.actionBtn} onPress={() => router.push('/wallet/add-money')}>
                            <Ionicons name="add-circle" size={24} color="#fff" />
                            <Text style={styles.actionText}>Add Money</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionBtn}>
                            <Ionicons name="scan" size={24} color="#fff" />
                            <Text style={styles.actionText}>Scan & Pay</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>

                {/* Features */}
                <View style={styles.features}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.grid}>
                        <TouchableOpacity style={styles.gridItem}>
                            <View style={[styles.gridIcon, { backgroundColor: '#E3F2FD' }]}>
                                <Ionicons name="document-text" size={24} color="#1976D2" />
                            </View>
                            <Text style={styles.gridLabel}>Statements</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gridItem}>
                            <View style={[styles.gridIcon, { backgroundColor: '#FFF3E0' }]}>
                                <Ionicons name="gift" size={24} color="#F57C00" />
                            </View>
                            <Text style={styles.gridLabel}>Rewards</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gridItem}>
                            <View style={[styles.gridIcon, { backgroundColor: '#F3E5F5' }]}>
                                <Ionicons name="card" size={24} color="#7B1FA2" />
                            </View>
                            <Text style={styles.gridLabel}>Cards</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.gridItem}>
                            <View style={[styles.gridIcon, { backgroundColor: '#E8F5E9' }]}>
                                <Ionicons name="headset" size={24} color="#388E3C" />
                            </View>
                            <Text style={styles.gridLabel}>Support</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* History */}
                <View style={styles.history}>
                    <View style={styles.historyHeader}>
                        <Text style={styles.sectionTitle}>Recent Transactions</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={TRANSACTIONS}
                        renderItem={renderTransaction}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                    />
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F5F5F5' },
    card: {
        margin: 20,
        borderRadius: 20,
        padding: 24,
        shadowColor: '#1B5E20',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    label: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginBottom: 4 },
    balance: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
    walletIconBg: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        padding: 10,
        borderRadius: 12,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginVertical: 20,
    },
    cardActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        gap: 8,
    },
    actionText: { color: '#fff', fontWeight: 'bold' },

    features: { paddingHorizontal: 20, marginBottom: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 16 },
    grid: { flexDirection: 'row', justifyContent: 'space-between' },
    gridItem: { alignItems: 'center', width: '22%' },
    gridIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    gridLabel: { fontSize: 12, color: '#555' },

    history: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, flex: 1 },
    historyHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    seeAll: { color: Colors.light.primary, fontWeight: '600' },

    txnItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    txnIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    txnInfo: { flex: 1 },
    txnTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 2 },
    txnDate: { fontSize: 12, color: '#999' },
    txnAmount: { fontSize: 16, fontWeight: 'bold' },
});
