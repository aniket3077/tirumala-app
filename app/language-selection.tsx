import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const LANGUAGES = [
    { id: 'en', name: 'English', native: 'English', sub: 'Default' },
    { id: 'hi', name: 'Hindi', native: 'हिन्दी', sub: 'नमस्ते' },
    { id: 'te', name: 'Telugu', native: 'తెలుగు', sub: 'నమస్కారం' },
    { id: 'ta', name: 'Tamil', native: 'தமிழ்', sub: 'வணக்கம்' },
    { id: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', sub: 'ನಮಸ್ಕಾರ' },
    { id: 'mr', name: 'Marathi', native: 'मराठी', sub: 'नमस्कार' },
];

export default function LanguageSelectionScreen() {
    const router = useRouter();
    const [selectedLang, setSelectedLang] = useState<string | null>(null);

    const handleContinue = () => {
        if (selectedLang) {
            router.push('/auth/profile-setup');
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Hero Header */}
            <LinearGradient
                colors={['#1B5E20', '#2E7D32']}
                style={styles.header}
            >
                <SafeAreaView style={styles.headerSafeArea}>
                    <View style={styles.iconCircle}>
                        <Ionicons name="language" size={32} color={Colors.light.primary} />
                    </View>
                    <Text style={styles.title}>Welcome to Tirumala</Text>
                    <Text style={styles.subtitle}>Choose your preferred language</Text>
                </SafeAreaView>
            </LinearGradient>

            <View style={styles.contentContainer}>
                <ScrollView
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.grid}>
                        {LANGUAGES.map((lang) => (
                            <TouchableOpacity
                                key={lang.id}
                                style={[
                                    styles.card,
                                    selectedLang === lang.id && styles.cardSelected,
                                ]}
                                onPress={() => setSelectedLang(lang.id)}
                                activeOpacity={0.8}
                            >
                                <View style={styles.cardHeader}>
                                    <Text style={[styles.langNative, selectedLang === lang.id && styles.textSelected]}>
                                        {lang.native}
                                    </Text>
                                    {selectedLang === lang.id && (
                                        <Ionicons name="checkmark-circle" size={20} color={Colors.light.primary} />
                                    )}
                                </View>
                                <Text style={[styles.langSub, selectedLang === lang.id && styles.textSelectedSub]}>
                                    {lang.sub}
                                </Text>
                                <Text style={[styles.langName, selectedLang === lang.id && styles.textSelectedSub]}>
                                    {lang.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.button, !selectedLang && styles.buttonDisabled]}
                        disabled={!selectedLang}
                        onPress={handleContinue}
                        activeOpacity={0.9}
                    >
                        <Text style={styles.buttonText}>Continue</Text>
                        <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => router.push('/expert/login')}
                        style={{ marginTop: 20, padding: 10, alignSelf: 'center' }}
                    >
                        <Text style={{ color: Colors.light.primary, fontWeight: '600' }}>Are you an Expert? Login here</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        height: 280,
        paddingHorizontal: 24,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    headerSafeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#E8F5E9',
        opacity: 0.9,
        textAlign: 'center',
    },
    contentContainer: {
        flex: 1,
        marginTop: -40,
        paddingHorizontal: 20,
    },
    listContainer: {
        paddingBottom: 20,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardSelected: {
        borderColor: Colors.light.primary,
        backgroundColor: '#F1F8E9',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    langNative: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    langSub: {
        fontSize: 14,
        color: '#888',
        marginBottom: 4,
    },
    langName: {
        fontSize: 13,
        color: '#999',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        fontWeight: '600',
    },
    textSelected: {
        color: Colors.light.primary,
    },
    textSelectedSub: {
        color: Colors.light.primary,
        opacity: 0.8,
    },
    footer: {
        paddingVertical: 20,
    },
    button: {
        backgroundColor: Colors.light.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 18,
        borderRadius: 30,
        shadowColor: Colors.light.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    buttonDisabled: {
        backgroundColor: '#BDBDBD',
        shadowOpacity: 0,
        elevation: 0,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 8,
    },
});
