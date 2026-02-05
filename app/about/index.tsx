import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Stack.Screen options={{ title: 'About', headerTintColor: Colors.light.primary, headerShadowVisible: false, headerStyle: { backgroundColor: '#fff' } }} />

            <View style={styles.header}>
                <View style={styles.logoCircle}>
                    <Image
                        source={require('../../assets/images/loading-screen.png')}
                        style={styles.logo}
                        resizeMode="cover"
                    />
                </View>
                <Text style={styles.appName}>Tirumala</Text>
                <Text style={styles.version}>Version 1.0.0 (Build 42)</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Our Mission</Text>
                <Text style={styles.text}>
                    Tirumala is dedicated to empowering Indian farmers with cutting-edge technology, real-time market data, and expert agricultural guidance. We bridge the gap between tradition and innovation.
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Contact & Support</Text>
                <TouchableOpacity style={styles.row} onPress={() => Linking.openURL('mailto:support@tirumala.ag')}>
                    <Ionicons name="mail-outline" size={20} color={Colors.light.primary} />
                    <Text style={styles.linkText}>support@tirumala.ag</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row} onPress={() => Linking.openURL('tel:18001234567')}>
                    <Ionicons name="call-outline" size={20} color={Colors.light.primary} />
                    <Text style={styles.linkText}>1800-123-4567</Text>
                </TouchableOpacity>
                <View style={styles.row}>
                    <Ionicons name="location-outline" size={20} color={Colors.light.primary} />
                    <Text style={styles.infoText}>Hitech City, Hyderabad, India</Text>
                </View>
            </View>

            <Text style={styles.copy}>© 2025 Tirumala Agrotech Pvt Ltd.</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    content: { padding: 24, paddingBottom: 40 },
    header: { alignItems: 'center', marginBottom: 32, marginTop: 10 },
    logoCircle: {
        width: 100,
        height: 100,
        borderRadius: 24,
        overflow: 'hidden',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        backgroundColor: '#fff',
    },
    logo: { width: '100%', height: '100%' },
    appName: { fontSize: 28, fontWeight: 'bold', color: '#111', marginBottom: 4 },
    version: { fontSize: 14, color: '#888' },

    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#eee',
    },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 },
    text: { fontSize: 15, lineHeight: 24, color: '#555' },

    row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f9f9f9', marginBottom: 4 },
    linkText: { fontSize: 16, color: Colors.light.primary, marginLeft: 16, fontWeight: '500' },
    infoText: { fontSize: 16, color: '#555', marginLeft: 16 },

    copy: { textAlign: 'center', color: '#aaa', fontSize: 12, marginTop: 20 },
});
