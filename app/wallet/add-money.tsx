import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

const PRESET_AMOUNTS = [100, 200, 500, 1000];

export default function AddMoneyScreen() {
    const router = useRouter();
    const [amount, setAmount] = useState('');

    const handleAdd = () => {
        // Here we would integrate payment gateway
        alert('Payment Gateway would open here. Added ₹' + amount);
        router.back();
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Enter Amount</Text>

                <View style={styles.inputContainer}>
                    <Text style={styles.currency}>₹</Text>
                    <TextInput
                        style={styles.input}
                        value={amount}
                        onChangeText={setAmount}
                        placeholder="0"
                        keyboardType="numeric"
                        autoFocus
                    />
                </View>

                <View style={styles.presets}>
                    {PRESET_AMOUNTS.map((amt) => (
                        <TouchableOpacity
                            key={amt}
                            style={styles.chip}
                            onPress={() => setAmount(amt.toString())}
                        >
                            <Text style={styles.chipText}>+ ₹{amt}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity
                    style={[styles.btn, !amount && styles.btnDisabled]}
                    onPress={handleAdd}
                    disabled={!amount}
                >
                    <Text style={styles.btnText}>Proceed to Pay</Text>
                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    content: { padding: 24, alignItems: 'center' },
    title: { fontSize: 16, color: '#666', marginBottom: 20 },

    inputContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 40 },
    currency: { fontSize: 40, fontWeight: 'bold', color: '#333', marginRight: 8 },
    input: { fontSize: 56, fontWeight: 'bold', color: '#333', minWidth: 100 },

    presets: { flexDirection: 'row', gap: 12, marginBottom: 40 },
    chip: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    chipText: { fontWeight: '600', color: '#333' },

    btn: {
        width: '100%',
        backgroundColor: Colors.light.primary,
        paddingVertical: 16,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        shadowColor: Colors.light.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    btnDisabled: { backgroundColor: '#ccc', shadowOpacity: 0 },
    btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
