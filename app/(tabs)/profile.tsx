import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
    const router = useRouter();

    const CROPS = ['Wheat', 'Rice', 'Mustard'];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header / Cover */}
            <View style={styles.headerContainer}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1000&auto=format&fit=crop' }}
                    style={styles.coverImage}
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.coverOverlay}
                />

                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: 'https://ui-avatars.com/api/?name=Rahul+Kumar&background=0D8ABC&color=fff&size=200' }}
                            style={styles.avatar}
                        />
                        <TouchableOpacity style={styles.editAvatarBtn}>
                            <Ionicons name="camera" size={16} color="#444" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.name}>Rahul Kumar</Text>
                    <Text style={styles.location}><Ionicons name="location" size={14} color="#ccc" /> Rampur, Uttar Pradesh</Text>
                </View>
            </View>

            <View style={styles.content}>

                {/* Stats / Info Grid */}
                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>5.2</Text>
                        <Text style={styles.statLabel}>Acres</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>12</Text>
                        <Text style={styles.statLabel}>Crops</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>4.8</Text>
                        <Text style={styles.statLabel}>Rating</Text>
                    </View>
                </View>

                {/* Personal Information */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Personal Details</Text>
                        <TouchableOpacity onPress={() => router.push('/auth/profile-setup')}>
                            <Text style={styles.editLink}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoCard}>
                        <View style={styles.infoRow}>
                            <Ionicons name="call-outline" size={20} color="#666" style={styles.infoIcon} />
                            <View>
                                <Text style={styles.infoLabel}>Phone Number</Text>
                                <Text style={styles.infoValue}>+91 98765 43210</Text>
                            </View>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.infoRow}>
                            <Ionicons name="mail-outline" size={20} color="#666" style={styles.infoIcon} />
                            <View>
                                <Text style={styles.infoLabel}>Email</Text>
                                <Text style={styles.infoValue}>rahul.kumar@example.com</Text>
                            </View>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.infoRow}>
                            <Ionicons name="language-outline" size={20} color="#666" style={styles.infoIcon} />
                            <View>
                                <Text style={styles.infoLabel}>Language</Text>
                                <Text style={styles.infoValue}>Hindi, English</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Crops */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>My Crops</Text>
                    <View style={styles.cropsContainer}>
                        {CROPS.map((crop, index) => (
                            <View key={index} style={styles.cropChip}>
                                <Ionicons name="leaf" size={16} color={Colors.light.primary} style={{ marginRight: 6 }} />
                                <Text style={styles.cropText}>{crop}</Text>
                            </View>
                        ))}
                        <TouchableOpacity style={styles.addCropBtn} onPress={() => router.push('/auth/profile-setup')}>
                            <Ionicons name="add" size={20} color="#666" />
                        </TouchableOpacity>
                    </View>
                </View>


                {/* Expert Mode Entry */}
                <TouchableOpacity
                    style={styles.expertCard}
                    onPress={() => router.push('/expert/login')}
                >
                    <LinearGradient
                        colors={['#1a2e05', '#2f4f10']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.expertGradient}
                    >
                        <View>
                            <Text style={styles.expertTitle}>Switch to Expert Mode</Text>
                            <Text style={styles.expertSubtitle}>Manage consultations & earnings</Text>
                        </View>
                        <Ionicons name="arrow-forward-circle" size={32} color="#fff" />
                    </LinearGradient>
                </TouchableOpacity>

                <View style={{ height: 100 }} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    headerContainer: { height: 280, position: 'relative', marginBottom: 60 },
    coverImage: { width: '100%', height: '100%' },
    coverOverlay: { ...StyleSheet.absoluteFillObject },
    profileHeader: { position: 'absolute', bottom: -50, width: '100%', alignItems: 'center' },
    avatarContainer: { position: 'relative', marginBottom: 12 },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#fff'
    },
    editAvatarBtn: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    name: { fontSize: 24, fontWeight: 'bold', color: '#333' },
    location: { fontSize: 14, color: '#666', marginTop: 4 },

    content: { paddingHorizontal: 20, paddingTop: 10 },

    statsRow: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        justifyContent: 'space-between',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statItem: { alignItems: 'center', flex: 1 },
    statValue: { fontSize: 20, fontWeight: 'bold', color: Colors.light.primary },
    statLabel: { fontSize: 12, color: '#888', marginTop: 2 },
    divider: { width: 1, backgroundColor: '#eee', height: '100%' },

    section: { marginBottom: 24 },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    editLink: { color: Colors.light.primary, fontWeight: '600' },

    infoCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4 },
    infoIcon: { width: 40 },
    infoLabel: { fontSize: 12, color: '#999', marginBottom: 2 },
    infoValue: { fontSize: 16, color: '#333', fontWeight: '500' },
    separator: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 12 },

    cropsContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
    cropChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.light.primary,
    },
    cropText: { color: Colors.light.primary, fontWeight: '600' },
    addCropBtn: {
        width: 42,
        height: 42,
        borderRadius: 21,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    expertCard: {
        marginTop: 24,
        marginBottom: 8,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    expertGradient: {
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    expertTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    expertSubtitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
    },
});
