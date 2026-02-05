import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function CreateTicketScreen() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Raise Issue', headerTintColor: Colors.light.primary, headerShadowVisible: false, headerStyle: { backgroundColor: '#F8F9FA' } }} />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

                    <View style={styles.header}>
                        <View style={styles.iconCircle}>
                            <Ionicons name="construct" size={32} color={Colors.light.primary} />
                        </View>
                        <Text style={styles.headline}>Something wrong?</Text>
                        <Text style={styles.subhead}>Describe your issue and we'll help you fix it.</Text>
                    </View>

                    <View style={styles.card}>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Issue Title</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons name="alert-circle-outline" size={20} color="#999" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="e.g. Pump not working"
                                    placeholderTextColor="#aaa"
                                    value={title}
                                    onChangeText={setTitle}
                                />
                            </View>
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Description</Text>
                            <View style={[styles.inputContainer, styles.textAreaContainer]}>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder="Describe your issue in detail..."
                                    placeholderTextColor="#aaa"
                                    multiline
                                    textAlignVertical="top"
                                    value={desc}
                                    onChangeText={setDesc}
                                />
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[styles.submitBtn, (!title || !desc) && styles.btnDisabled]}
                        activeOpacity={0.8}
                        disabled={!title || !desc}
                        onPress={() => router.back()}
                    >
                        <LinearGradient
                            colors={(!title || !desc) ? ['#ccc', '#bbb'] : [Colors.light.primary, '#2E7D32']}
                            style={styles.gradientBtn}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.btnText}>Submit Ticket</Text>
                            <Ionicons name="arrow-forward" size={20} color="#fff" />
                        </LinearGradient>
                    </TouchableOpacity>

                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    content: { padding: 24 },
    header: { alignItems: 'center', marginBottom: 32 },
    iconCircle: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#E8F5E9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16
    },
    headline: { fontSize: 24, fontWeight: 'bold', color: '#1A1C1E', marginBottom: 8 },
    subhead: { fontSize: 16, color: '#666', textAlign: 'center', paddingHorizontal: 20 },

    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    formGroup: { marginBottom: 20 },
    label: { fontSize: 13, fontWeight: '600', color: '#444', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9F9F9',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    textAreaContainer: { alignItems: 'flex-start', paddingVertical: 12 },
    inputIcon: { marginRight: 10 },
    input: { flex: 1, paddingVertical: 12, fontSize: 16, color: '#333' },
    textArea: { height: 100 },

    submitBtn: {
        borderRadius: 30,
        overflow: 'hidden',
        shadowColor: Colors.light.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    btnDisabled: { shadowOpacity: 0, elevation: 0 },
    gradientBtn: {
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
    },
    btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
