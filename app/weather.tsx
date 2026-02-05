import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

const HOURLY_FORECAST = [
    { time: 'Now', temp: '32°', icon: 'weather-sunny', color: '#FFD54F' },
    { time: '1 PM', temp: '33°', icon: 'weather-sunny', color: '#FFD54F' },
    { time: '2 PM', temp: '34°', icon: 'weather-partly-cloudy', color: '#FF9800' },
    { time: '3 PM', temp: '32°', icon: 'weather-cloudy', color: '#90CAF9' },
    { time: '4 PM', temp: '30°', icon: 'weather-rainy', color: '#5C6BC0' },
];

const DAILY_FORECAST = [
    { day: 'Tomorrow', icon: 'weather-partly-cloudy', tempMax: '31°', tempMin: '24°', precip: '10%' },
    { day: 'Friday', icon: 'weather-sunny', tempMax: '33°', tempMin: '25°', precip: '0%' },
    { day: 'Saturday', icon: 'weather-cloudy', tempMax: '29°', tempMin: '23°', precip: '20%' },
    { day: 'Sunday', icon: 'weather-pouring', tempMax: '27°', tempMin: '22°', precip: '80%' },
    { day: 'Monday', icon: 'weather-lightning', tempMax: '25°', tempMin: '21°', precip: '90%' },
];

const FARMING_ADVISORY = [
    { id: 1, title: 'Spray Alert', desc: 'High wind speed (12km/h). Avoid spraying pesticides today.', icon: 'alert-circle', color: '#FF5722' },
    { id: 2, title: 'Irrigation', desc: 'Rain expected on Sunday. Postpone irrigation.', icon: 'water', color: '#2196F3' },
];

export default function WeatherScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Immersive Background */}
            <LinearGradient
                colors={['#4facfe', '#00f2fe']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

                {/* Header / Nav */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Weather Forecast</Text>
                    <View style={{ width: 40 }} />
                </View>

                {/* Hero Section */}
                <Animated.View entering={FadeInDown.delay(100).duration(800)} style={styles.heroSection}>
                    <Text style={styles.location}>Rampur, Uttar Pradesh</Text>
                    <Text style={styles.date}>Today, 24 Oct</Text>

                    <View style={styles.bigTempContainer}>
                        <Text style={styles.bigTemp}>32°</Text>
                        <MaterialCommunityIcons name="weather-sunny" size={60} color="#FFD54F" style={styles.heroIcon} />
                    </View>
                    <Text style={styles.condition}>Mostly Sunny</Text>
                    <View style={styles.hlContainer}>
                        <Text style={styles.hlText}>H: 34°  L: 28°</Text>
                    </View>
                </Animated.View>

                {/* Stats Grid */}
                <Animated.View entering={FadeInDown.delay(200).duration(800)} style={styles.statsRow}>
                    <BlurView intensity={30} tint="light" style={styles.statCard}>
                        <Ionicons name="water-outline" size={24} color="#fff" />
                        <Text style={styles.statValue}>45%</Text>
                        <Text style={styles.statLabel}>Humidity</Text>
                    </BlurView>
                    <BlurView intensity={30} tint="light" style={styles.statCard}>
                        <MaterialCommunityIcons name="weather-windy" size={24} color="#fff" />
                        <Text style={styles.statValue}>12 km/h</Text>
                        <Text style={styles.statLabel}>Wind SE</Text>
                    </BlurView>
                    <BlurView intensity={30} tint="light" style={styles.statCard}>
                        <Ionicons name="umbrella-outline" size={24} color="#fff" />
                        <Text style={styles.statValue}>0%</Text>
                        <Text style={styles.statLabel}>Rain</Text>
                    </BlurView>
                </Animated.View>

                {/* Hourly Forecast */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Hourly Forecast</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -20, paddingHorizontal: 20 }}>
                        {HOURLY_FORECAST.map((item, index) => (
                            <Animated.View
                                key={index}
                                entering={FadeInRight.delay(300 + (index * 100)).duration(600)}
                                style={styles.hourlyCard}
                            >
                                <Text style={styles.hourlyTime}>{item.time}</Text>
                                <MaterialCommunityIcons name={item.icon as any} size={28} color={item.color} style={{ marginVertical: 8 }} />
                                <Text style={styles.hourlyTemp}>{item.temp}</Text>
                            </Animated.View>
                        ))}
                    </ScrollView>
                </View>

                {/* Farming Advisory (New Feature) */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Agri Advisory</Text>
                    {FARMING_ADVISORY.map((item, index) => (
                        <Animated.View
                            key={index}
                            entering={FadeInDown.delay(600 + (index * 100))}
                            style={styles.advisoryCard}
                        >
                            <View style={[styles.advisoryIcon, { backgroundColor: item.color + '20' }]}>
                                <Ionicons name={item.icon as any} size={24} color={item.color} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.advisoryTitle}>{item.title}</Text>
                                <Text style={styles.advisoryDesc}>{item.desc}</Text>
                            </View>
                        </Animated.View>
                    ))}
                </View>

                {/* 5-Day Forecast */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>5-Day Forecast</Text>
                    <BlurView intensity={50} tint="light" style={styles.dailyList}>
                        {DAILY_FORECAST.map((item, index) => (
                            <View key={index} style={[styles.dailyRow, index !== DAILY_FORECAST.length - 1 && styles.dailyDivider]}>
                                <Text style={styles.dailyDay}>{item.day}</Text>
                                <View style={styles.dailyIcon}>
                                    <MaterialCommunityIcons name={item.icon as any} size={24} color="#333" />
                                    <Text style={styles.precipText}>{item.precip}</Text>
                                </View>
                                <View style={styles.dailyTemps}>
                                    <Text style={styles.maxTemp}>{item.tempMax}</Text>
                                    <Text style={styles.minTemp}>{item.tempMin}</Text>
                                </View>
                            </View>
                        ))}
                    </BlurView>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContent: { paddingTop: 60, paddingBottom: 40 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: { fontSize: 18, color: '#fff', fontWeight: 'bold' },

    heroSection: { alignItems: 'center', marginBottom: 30 },
    location: { fontSize: 28, fontWeight: 'bold', color: '#fff', textShadowColor: 'rgba(0,0,0,0.1)', textShadowRadius: 10 },
    date: { fontSize: 16, color: 'rgba(255,255,255,0.9)', marginTop: 4 },
    bigTempContainer: { flexDirection: 'row', alignItems: 'flex-start', marginTop: 10 },
    bigTemp: { fontSize: 90, fontWeight: '200', color: '#fff' },
    heroIcon: { marginTop: 20, marginLeft: 10 },
    condition: { fontSize: 24, fontWeight: '500', color: '#fff', marginTop: -10 },
    hlContainer: { marginTop: 8 },
    hlText: { fontSize: 16, color: 'rgba(255,255,255,0.9)' },

    statsRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 30 },
    statCard: {
        width: '31%',
        padding: 12,
        borderRadius: 16,
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.15)',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    statValue: { fontSize: 16, fontWeight: 'bold', color: '#fff', marginTop: 8 },
    statLabel: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },

    sectionContainer: { marginBottom: 24, paddingHorizontal: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 12, textShadowColor: 'rgba(0,0,0,0.2)', textShadowRadius: 5 },

    hourlyCard: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        padding: 16,
        borderRadius: 20,
        alignItems: 'center',
        marginRight: 10,
        width: 70,
    },
    hourlyTime: { fontSize: 12, color: '#666', fontWeight: 'bold' },
    hourlyTemp: { fontSize: 16, fontWeight: 'bold', color: '#333' },

    advisoryCard: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    advisoryIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    advisoryTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 2 },
    advisoryDesc: { fontSize: 13, color: '#666', lineHeight: 18 },

    dailyList: {
        backgroundColor: 'rgba(255,255,255,0.85)',
        borderRadius: 20,
        padding: 16,
        overflow: 'hidden',
    },
    dailyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12 },
    dailyDivider: { borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
    dailyDay: { width: 100, fontSize: 16, fontWeight: '600', color: '#333' },
    dailyIcon: { flex: 1, flexDirection: 'row', alignItems: 'center' },
    precipText: { fontSize: 12, color: '#1E88E5', marginLeft: 8, fontWeight: '600' },
    dailyTemps: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    maxTemp: { fontSize: 16, fontWeight: 'bold', color: '#333' },
    minTemp: { fontSize: 16, color: '#888' },
});
