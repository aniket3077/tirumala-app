import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList, Dimensions, TextInput } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const CATEGORIES = [
    { id: 'all', title: 'All' },
    { id: 'wheat', title: 'Wheat' },
    { id: 'pest', title: 'Pest Control' },
    { id: 'soil', title: 'Soil Health' },
    { id: 'seeds', title: 'Seeds' },
];

const EXPERTS = [
    {
        id: '1',
        name: 'Dr. Ramesh Gupta',
        title: 'MSc Agriculture, PhD',
        specialty: 'Disease & Pest Control',
        exp: '15 Years',
        rating: 4.9,
        reviews: 2450,
        lang: 'Hindi, English',
        rate: 10,
        image: require('../../assets/images/expert_1.png'),
        online: true,
    },
    {
        id: '2',
        name: 'Dr. Anjali Singh',
        title: 'BSc Agri, Soil Scientist',
        specialty: 'Soil Health & Fertilizers',
        exp: '8 Years',
        rating: 4.8,
        reviews: 1200,
        lang: 'Hindi, Punjabi',
        rate: 8,
        image: require('../../assets/images/expert_2.png'),
        online: true,
    },
    {
        id: '3',
        name: 'Rajesh Kumar',
        title: 'Senior Agronomist',
        specialty: 'Organic Farming',
        exp: '12 Years',
        rating: 4.7,
        reviews: 890,
        lang: 'Hindi, English',
        rate: 12,
        image: { uri: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=0D8ABC&color=fff&size=200' },
        online: false, // Busy/Offline
    },
    {
        id: '4',
        name: 'Suresh Patel',
        title: 'Crop Consultant',
        specialty: 'Wheat & Rice',
        exp: '20 Years',
        rating: 4.9,
        reviews: 3100,
        lang: 'Gujarati, Hindi',
        rate: 15,
        image: { uri: 'https://ui-avatars.com/api/?name=Suresh+Patel&background=FF5722&color=fff&size=200' },
        online: true,
    },
];

export default function ConsultScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [selectedCat, setSelectedCat] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredExperts = EXPERTS.filter(item => {
        const matchesCat = selectedCat === 'all' ||
            (selectedCat === 'wheat' && item.specialty.includes('Wheat')) ||
            (selectedCat === 'pest' && item.specialty.includes('Pest')) ||
            (selectedCat === 'soil' && item.specialty.includes('Soil')) ||
            (selectedCat === 'seeds' && item.specialty.includes('Seeds')); // Basic mapping

        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.specialty.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCat && matchesSearch;
    });

    const renderExpertCard = ({ item }: { item: any }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.avatarContainer}>
                    <Image source={item.image} style={styles.avatar} />
                    <View style={[styles.statusDot, { backgroundColor: item.online ? '#4CAF50' : '#FFC107' }]} />
                </View>
                <View style={styles.info}>
                    <View style={styles.nameRow}>
                        <Text style={styles.name}>{item.name}</Text>
                        <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
                    </View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.specialty}>{item.specialty}</Text>
                    <Text style={styles.lang}>{item.lang}</Text>
                </View>
                <View style={styles.ratingInfo}>
                    <View style={styles.ratingBadge}>
                        <Text style={styles.ratingText}>{item.rating}</Text>
                        <Ionicons name="star" size={10} color="#fff" />
                    </View>
                    <Text style={styles.reviews}>{item.reviews} reviews</Text>
                    <Text style={styles.exp}>{item.exp} exp</Text>
                </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.actions}>
                <View style={styles.rateContainer}>
                    <Text style={styles.rateLabel}>Expert Rate</Text>
                    <Text style={styles.rateValue}>₹{item.rate}/min</Text>
                </View>
                <TouchableOpacity
                    style={styles.chatBtn}
                    activeOpacity={0.7}
                    onPress={() => router.push({ pathname: '/experts/chat', params: { expertName: item.name, expertId: item.id } })}
                >
                    <Ionicons name="chatbubble-ellipses-outline" size={20} color={Colors.light.primary} />
                    <Text style={styles.chatBtnText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.callBtn}
                    activeOpacity={0.7}
                    onPress={() => router.push({ pathname: '/experts/call', params: { expertName: item.name, expertId: item.id } })}
                >
                    <Ionicons name="call" size={20} color="#fff" />
                    <Text style={styles.callBtnText}>Call</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                <Text style={styles.headerTitle}>Agri Experts</Text>
                <TouchableOpacity style={styles.walletBtn} onPress={() => router.push('/wallet' as any)}>
                    <Ionicons name="wallet-outline" size={20} color="#333" />
                    <Text style={styles.walletText}>₹50</Text>
                </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Search Bar */}
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color="#999" style={{ marginRight: 8 }} />
                    <TextInput
                        placeholder="Search expert, skill..."
                        style={styles.searchText}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                {/* Categories */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
                    {CATEGORIES.map((cat) => (
                        <TouchableOpacity
                            key={cat.id}
                            style={[styles.catChip, selectedCat === cat.id && styles.catChipActive]}
                            onPress={() => setSelectedCat(cat.id)}
                        >
                            <Text style={[styles.catText, selectedCat === cat.id && styles.catTextActive]}>{cat.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Banner */}
                <LinearGradient
                    colors={['#E8F5E9', '#C8E6C9']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.banner}
                >
                    <View style={{ flex: 1 }}>
                        <Text style={styles.bannerTitle}>First Call Free!</Text>
                        <Text style={styles.bannerSub}>Talk to top agronomists for 5 mins</Text>
                    </View>
                    <Ionicons name="call" size={40} color={Colors.light.primary} style={{ opacity: 0.8 }} />
                </LinearGradient>

                <View style={styles.expertListHeader}>
                    <Text style={styles.sectionTitle}>Available Experts</Text>
                    <Text style={styles.resultCount}>{filteredExperts.length} Found</Text>
                </View>

                <FlatList
                    data={filteredExperts}
                    renderItem={renderExpertCard}
                    keyExtractor={item => item.id}
                    scrollEnabled={false} // Nested in ScrollView
                    ListEmptyComponent={<Text style={styles.emptyText}>No experts found matching your criteria.</Text>}
                />

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F9F9F9' },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 16,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#333' },
    walletBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
    },
    walletText: { marginLeft: 6, fontWeight: 'bold', color: '#333' },

    scrollContent: { padding: 16 },

    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
        marginBottom: 16,
    },
    searchText: { color: '#333', fontSize: 16, flex: 1 },

    catScroll: { marginBottom: 20, flexDirection: 'row' },
    catChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        marginRight: 8,
    },
    catChipActive: {
        backgroundColor: Colors.light.primary,
        borderColor: Colors.light.primary,
    },
    catText: { color: '#666', fontWeight: '600' },
    catTextActive: { color: '#fff' },

    banner: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
    },
    bannerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1B5E20' },
    bannerSub: { fontSize: 14, color: '#2E7D32', marginTop: 4 },

    expertListHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    resultCount: { fontSize: 12, color: '#999' },

    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#f5f5f5',
    },
    cardHeader: { flexDirection: 'row' },
    avatarContainer: { marginRight: 16, position: 'relative' },
    avatar: { width: 64, height: 64, borderRadius: 32 },
    statusDot: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: '#fff',
    },
    info: { flex: 1 },
    nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
    name: { fontSize: 16, fontWeight: 'bold', color: '#333', marginRight: 4 },
    title: { fontSize: 12, color: '#666', marginBottom: 2 },
    specialty: { fontSize: 12, color: '#888', fontStyle: 'italic' },
    lang: { fontSize: 11, color: '#999', marginTop: 4 },

    ratingInfo: { alignItems: 'flex-end' },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        marginBottom: 4,
    },
    ratingText: { color: '#fff', fontSize: 12, fontWeight: 'bold', marginRight: 2 },
    reviews: { fontSize: 11, color: '#888' },
    exp: { fontSize: 11, color: '#666', fontWeight: '600', marginTop: 2 },

    divider: { height: 1, backgroundColor: '#f0f0f0', marginVertical: 12 },

    actions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    rateContainer: { flex: 1 },
    rateLabel: { fontSize: 10, color: '#999', textTransform: 'uppercase' },
    rateValue: { fontSize: 16, fontWeight: 'bold', color: '#333' },

    chatBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.light.primary,
        marginRight: 8,
    },
    chatBtnText: { color: Colors.light.primary, fontWeight: '600', marginLeft: 4, fontSize: 13 },

    callBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.light.primary,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
    },
    callBtnText: { color: '#fff', fontWeight: '600', marginLeft: 4, fontSize: 13 },

    emptyText: { textAlign: 'center', marginTop: 20, color: '#999', fontStyle: 'italic' }
});
