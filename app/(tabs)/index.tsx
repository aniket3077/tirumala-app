import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInRight, useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, interpolate, Extrapolation } from 'react-native-reanimated';
import { useAuth } from '@/context/AuthContext';

const { width } = Dimensions.get('window');

// Services Data
const SERVICES = [
  { id: 'expert', title: 'Agri Experts', icon: 'people', color: '#4CAF50', route: '/(tabs)/consult' },
  { id: 'video', title: 'Video Guidance', icon: 'play-circle', color: '#E91E63', route: '/guidance/videos' },
  { id: 'ticket', title: 'Ticket Status', icon: 'receipt', color: '#FF9800', route: '/support/ticket-tracking' },
  { id: 'weather', title: 'Weather', icon: 'cloud', color: '#2196F3', route: '/weather' },
];

const MANDI_RATES = [
  { crop: 'Wheat', price: '₹2,125/q', trend: 'up', color: '#81C784' },
  { crop: 'Rice', price: '₹2,900/q', trend: 'stable', color: '#FFD54F' },
  { crop: 'Cotton', price: '₹6,400/q', trend: 'down', color: '#E57373' },
  { crop: 'Maize', price: '₹2,200/q', trend: 'up', color: '#AED581' },
];

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const scrollY = useSharedValue(0);

  const profile = user?.profile || user?.farmerProfile;
  const name = profile?.fullName || profile?.name || 'Agri User';
  const location = profile?.village || profile?.location || 'India';

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: scrollY.value * 0.5 },
        { scale: interpolate(scrollY.value, [-280, 0, 280], [1.5, 1, 1], Extrapolation.CLAMP) },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Helper Header Background */}
        <Animated.View entering={FadeInDown.duration(800)} style={styles.headerBg}>
          <Animated.Image
            source={require('../../assets/images/home-banner.png')}
            style={[styles.heroImage, headerAnimatedStyle]}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.4)']}
            style={styles.heroOverlay}
          />
          <SafeAreaView style={styles.headerContent}>
            <View style={styles.topBar}>
              <View style={styles.headerLeft}>
                <Image
                  source={require('../../assets/images/tirumala_logo_final.png')}
                  style={styles.logoSmall}
                  resizeMode="contain"
                />
                <View>
                  <Text style={styles.greeting}>Good Morning,</Text>
                  <Text style={styles.userName}>{name}</Text>
                  <View style={styles.locationTag}>
                    <Ionicons name="location" size={10} color="#fff" />
                    <Text style={styles.location}> {location}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.headerRight}>
                <TouchableOpacity style={styles.notifBtn} onPress={() => router.push('/notifications' as any)} activeOpacity={0.8}>
                  <Ionicons name="notifications" size={24} color="#fff" />
                  <View style={styles.badge} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.profileBtn} onPress={() => router.push('/(tabs)/profile')} activeOpacity={0.8}>
                  <Image
                    source={{ uri: profile?.avatar || profile?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random` }}
                    style={styles.profileImg}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </Animated.View>

        {/* Quick Actions / Highlights similar to Story/Nav */}
        <Animated.View entering={FadeInDown.delay(200).duration(800)} style={styles.quickNavContainer}>
          <View style={styles.quickNav}>
            <TouchableOpacity style={styles.quickNavItem} onPress={() => router.push('/wallet' as any)}>
              <View style={[styles.quickNavIcon, { backgroundColor: '#E8F5E9' }]}>
                <Ionicons name="wallet" size={22} color="#43A047" />
              </View>
              <Text style={styles.quickNavText}>Wallet</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.quickNavItem} onPress={() => router.push('/support/live-chat')}>
              <View style={[styles.quickNavIcon, { backgroundColor: '#E3F2FD' }]}>
                <Ionicons name="chatbubbles" size={22} color="#1E88E5" />
              </View>
              <Text style={styles.quickNavText}>Live Chat</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.quickNavItem} onPress={() => router.push('/support/create-ticket')}>
              <View style={[styles.quickNavIcon, { backgroundColor: '#FFF3E0' }]}>
                <Ionicons name="create" size={22} color="#FB8C00" />
              </View>
              <Text style={styles.quickNavText}>Raise Issue</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.quickNavItem} onPress={() => router.push('/weather')}>
              <View style={[styles.quickNavIcon, { backgroundColor: '#E8F5E9' }]}>
                <Ionicons name="sunny" size={22} color="#43A047" />
              </View>
              <Text style={styles.quickNavText}>Weather</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Feature: Mandi Rates with Image */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Mandi Updates</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>

        <View style={styles.mandiContainer}>
          <Animated.View entering={FadeInRight.delay(400).duration(800)} style={styles.mandiHero}>
            <Image source={require('../../assets/images/feature-mandi.png')} style={styles.mandiImg} />
            <View style={styles.mandiOverlay}>
              <Text style={styles.mandiTitle}>Market Trends</Text>
              <Text style={styles.mandiSub}>Prices are rising for Kharif crops</Text>
            </View>
          </Animated.View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.ratesScroll}
            contentContainerStyle={{ paddingLeft: 16, paddingRight: 20 }}
          >
            {MANDI_RATES.map((rate, index) => (
              <Animated.View key={index} entering={FadeInRight.delay(500 + (index * 100)).duration(600)} style={styles.rateCard}>
                <View style={styles.rateHeader}>
                  <Text style={styles.rateCrop}>{rate.crop}</Text>
                  <Ionicons
                    name={rate.trend === 'up' ? 'trending-up' : rate.trend === 'down' ? 'trending-down' : 'remove'}
                    size={16}
                    color={rate.trend === 'up' ? '#4CAF50' : rate.trend === 'down' ? '#E53935' : '#757575'}
                  />
                </View>
                <Text style={styles.ratePrice}>{rate.price}</Text>
              </Animated.View>
            ))}
          </ScrollView>
        </View>

        {/* Services Grid (More visual) */}
        <Text style={[styles.sectionTitle, { marginLeft: 24, marginTop: 24 }]}>Explore Services</Text>
        <View style={styles.grid}>
          {SERVICES.map((service, index) => (
            <Animated.View
              key={service.id}
              entering={FadeInDown.delay(600 + (index * 100)).duration(800)}
              style={styles.gridItem}
            >
              <TouchableOpacity
                style={{ width: '100%' }}
                onPress={() => router.push(service.route as any)}
                activeOpacity={0.9}
              >
                <View style={[styles.cardBg, { backgroundColor: '#fff' }]}>
                  <View style={[styles.iconContainer, { backgroundColor: service.color + '10' }]}>
                    <Ionicons name={service.icon as any} size={26} color={service.color} />
                  </View>
                  <View style={styles.cardText}>
                    <Text style={styles.gridLabel}>{service.title}</Text>
                    <Text style={styles.gridSub}>Tap to open</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#ccc" style={styles.cardArrow} />
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7', // Very light grey/white
  },
  headerBg: {
    height: 280,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  headerContent: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoSmall: {
    width: 44,
    height: 44,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  greeting: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    fontWeight: '600',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 4,
  },
  locationTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  location: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notifBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  profileBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  profileImg: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#EF5350',
    borderWidth: 2,
    borderColor: '#fff',
  },
  content: {
    paddingBottom: 20,
  },
  quickNavContainer: {
    paddingHorizontal: 20,
    marginTop: -40, // Overlap
  },
  quickNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  quickNavItem: {
    alignItems: 'center',
    flex: 1,
  },
  quickNavIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickNavText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444',
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#EEEEEE',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  seeAll: {
    color: Colors.light.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  mandiContainer: {
    paddingLeft: 24,
  },
  mandiHero: {
    width: width - 48,
    height: 160,
    backgroundColor: '#FFF8E1',
    borderRadius: 24,
    marginBottom: 16,
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
    position: 'relative',
  },
  mandiImg: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
    position: 'absolute',
    right: -10,
    bottom: -10,
  },
  mandiOverlay: {
    padding: 24,
    width: '60%',
  },
  mandiTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  mandiSub: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  ratesScroll: {
    marginLeft: -8,
  },
  rateCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginLeft: 8,
    marginRight: 8,
    width: 130,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  rateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  rateCrop: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  ratePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  gridItem: {
    width: '48%',
    marginBottom: 16,
  },
  cardBg: {
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F5F5F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    marginLeft: 12,
    flex: 1,
  },
  gridLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#333',
  },
  gridSub: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
  cardArrow: {
    opacity: 0.5,
  },
});
