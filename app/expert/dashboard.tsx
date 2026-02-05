import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, Platform, ActivityIndicator, Alert } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Use localhost for iOS/Web, 10.0.2.2 for Android Emulator
// For Physical Device: Replace with your PC's IP (e.g., 'http://192.168.1.5:5000')
const API_URL = 'https://tirumla-backend.vercel.app';

export default function ExpertDashboard() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { expertProfileId, name, token } = params;

    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        try {
            if (!expertProfileId || !token) {
                console.error("Missing credentials:", params);
                return;
            }

            console.log(`Fetching earnings from: ${API_URL}/api/earnings/${expertProfileId}`);

            // Fetch earnings summary
            const res = await fetch(`${API_URL}/api/earnings/${expertProfileId}`, {
                headers: { 'x-auth-token': token as string }
            });
            const data = await res.json();

            if (res.ok) {
                setStats(data.summary);
            } else {
                console.error("Fetch failed:", data);
            }
        } catch (e) {
            console.error("Network request failed:", e);
            // Optional: Alert.alert("Connection Error", "Could not fetch dashboard data. Check your connection.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!expertProfileId) {
            Alert.alert("Error", "Expert profile not found. Please relogin.");
            router.replace('/expert/login');
            return;
        }
        fetchData();
    }, [expertProfileId]);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchData().finally(() => setRefreshing(false));
    }, []);

    const displayName = typeof name === 'string' ? name : 'Agri Expert';

    return (
        <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            showsVerticalScrollIndicator={false}
        >
            <Stack.Screen options={{ title: 'Dashboard', headerShown: false }} />

            {/* Header */}
            <LinearGradient
                colors={['#059669', '#0f766e']}
                style={styles.header}
            >
                <View style={styles.headerTop}>
                    <TouchableOpacity onPress={() => router.replace('/')} style={styles.closeBtn}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View style={styles.onlineBadge}>
                        <View style={styles.onlineDot} />
                        <Text style={styles.onlineText}>Online</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={styles.welcome}>Welcome back,</Text>
                        <Text style={styles.expertName}>{displayName}</Text>
                    </View>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{displayName.charAt(0)}</Text>
                    </View>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>4.9</Text>
                        <Text style={styles.statLabel}>Rating</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{stats?.totalConsultations || 0}</Text>
                        <Text style={styles.statLabel}>Sessions</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{loading ? '-' : `₹${(stats?.totalNetEarning || 0).toFixed(0)}`}</Text>
                        <Text style={styles.statLabel}>Earned</Text>
                    </View>
                </View>
            </LinearGradient>

            <View style={styles.content}>
                {/* Earnings Card */}
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={styles.iconBox}>
                            <Ionicons name="wallet" size={24} color="#059669" />
                        </View>
                        <View>
                            <Text style={styles.cardTitle}>Wallet Balance</Text>
                            <Text style={styles.cardSubtitle}>Available for payout</Text>
                        </View>
                    </View>

                    {loading ? (
                        <ActivityIndicator style={{ padding: 20 }} color="#059669" />
                    ) : (
                        <>
                            <Text style={styles.amount}>₹{(stats?.pendingAmount || 0).toFixed(2)}</Text>

                            <View style={styles.row}>
                                <Text style={styles.label}>Total Withdrawn</Text>
                                <Text style={styles.value}>₹{(stats?.paidAmount || 0).toFixed(2)}</Text>
                            </View>
                            <View style={styles.divider} />
                            <TouchableOpacity style={styles.withdrawBtn} activeOpacity={0.8}>
                                <Text style={styles.withdrawText}>Request Payout</Text>
                                <Ionicons name="arrow-forward" size={18} color="#fff" style={{ marginLeft: 8 }} />
                            </TouchableOpacity>
                        </>
                    )}
                </View>

                {/* Quick Actions */}
                <Text style={styles.sectionTitle}>Manage</Text>
                <View style={styles.actionsGrid}>
                    <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
                        <View style={[styles.actionIcon, { backgroundColor: '#ECFDF5' }]}>
                            <Ionicons name="calendar" size={24} color="#059669" />
                        </View>
                        <Text style={styles.actionText}>Schedule</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
                        <View style={[styles.actionIcon, { backgroundColor: '#EFF6FF' }]}>
                            <Ionicons name="chatbubbles" size={24} color="#2563EB" />
                        </View>
                        <Text style={styles.actionText}>Chats</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
                        <View style={[styles.actionIcon, { backgroundColor: '#FFF7ED' }]}>
                            <Ionicons name="videocam" size={24} color="#EA580C" />
                        </View>
                        <Text style={styles.actionText}>Calls</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionBtn} activeOpacity={0.7}>
                        <View style={[styles.actionIcon, { backgroundColor: '#FAF5FF' }]}>
                            <Ionicons name="time" size={24} color="#9333EA" />
                        </View>
                        <Text style={styles.actionText}>History</Text>
                    </TouchableOpacity>
                </View>

                {/* Recent Activity Placeholder */}
                <Text style={styles.sectionTitle}>Recent Activity</Text>
                {stats?.totalConsultations > 0 ? (
                    <View style={styles.activityCard}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#E0F2F1', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                                <Ionicons name="person" size={20} color="#00897B" />
                            </View>
                            <View>
                                <Text style={{ fontWeight: '600', fontSize: 15, color: '#333' }}>Consultation</Text>
                                <Text style={{ color: '#64748B', fontSize: 12 }}>Video call completed</Text>
                            </View>
                        </View>
                        <Text style={{ fontWeight: '600', color: '#059669' }}>+₹100</Text>
                    </View>
                ) : (
                    <View style={{ alignItems: 'center', padding: 30, opacity: 0.6 }}>
                        <Text style={{ color: '#94a3b8' }}>No recent activity</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    header: { padding: 24, paddingTop: 60, paddingBottom: 40, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
    headerTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24, alignItems: 'center' },
    closeBtn: { padding: 8, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12 },
    onlineBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
    onlineDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10B981', marginRight: 6, borderWidth: 1, borderColor: '#fff' },
    onlineText: { color: '#fff', fontWeight: '600', fontSize: 12 },
    welcome: { fontSize: 14, color: 'rgba(255,255,255,0.9)', marginBottom: 4 },
    expertName: { fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 24 },
    avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
    avatarText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },

    statsRow: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' },
    statItem: { flex: 1, alignItems: 'center' },
    statValue: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
    statLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 11, marginTop: 4, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: '600' },
    statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)', height: '70%', alignSelf: 'center' },

    content: { padding: 20, marginTop: -30 },
    card: { backgroundColor: '#fff', borderRadius: 24, padding: 24, marginBottom: 24, shadowColor: '#64748B', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.08, shadowRadius: 16, elevation: 4 },
    cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
    iconBox: { width: 48, height: 48, borderRadius: 16, backgroundColor: '#ECFDF5', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
    cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#0F172A' },
    cardSubtitle: { fontSize: 13, color: '#64748B' },
    amount: { fontSize: 36, fontWeight: '800', color: '#059669', marginBottom: 8, letterSpacing: -0.5 },
    divider: { height: 1, backgroundColor: '#F1F5F9', marginBottom: 16 },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, backgroundColor: '#F8FAFC', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0' },
    label: { color: '#64748B', fontWeight: '500', fontSize: 14 },
    value: { fontWeight: '700', color: '#334155', fontSize: 15 },
    withdrawBtn: { backgroundColor: '#059669', borderRadius: 16, padding: 18, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', shadowColor: '#059669', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 3 },
    withdrawText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

    sectionTitle: { fontSize: 18, fontWeight: '700', color: '#0F172A', marginBottom: 16, marginLeft: 4 },
    actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 32 },
    actionBtn: { width: '48%', backgroundColor: '#fff', padding: 20, borderRadius: 24, alignItems: 'center', marginBottom: 4, shadowColor: '#64748B', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2, borderWidth: 1, borderColor: '#F1F5F9' },
    actionIcon: { width: 56, height: 56, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
    actionText: { fontWeight: '600', color: '#334155', fontSize: 14 },

    activityCard: { backgroundColor: '#fff', padding: 20, borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#64748B', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2, borderWidth: 1, borderColor: '#F1F5F9' }
});
