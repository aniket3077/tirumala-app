import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

const INITIAL_MESSAGES = [
    { id: '1', text: 'Namaste! Welcome to Tirumala Expert Support. How can I help you regarding your crops today?', sender: 'agent', time: '10:00 AM' },
];

export default function LiveChatScreen() {
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [input, setInput] = useState('');
    const listRef = useRef<FlatList>(null);

    const sendMessage = () => {
        if (!input.trim()) return;
        const userMsg = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Fake reply
        setTimeout(() => {
            const replyMsg = {
                id: Date.now().toString(),
                text: 'Thank you for tracking this issue. An agriculture scientist will review your query and respond shortly.',
                sender: 'agent',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, replyMsg]);
        }, 1500);
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Expert Chat', headerTintColor: Colors.light.primary }} />

            <FlatList
                ref={listRef}
                data={messages}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })}
                renderItem={({ item }) => (
                    <View style={[
                        styles.msgRow,
                        item.sender === 'user' ? styles.msgRowUser : styles.msgRowAgent
                    ]}>
                        {item.sender === 'agent' && (
                            <View style={styles.avatar}>
                                <Ionicons name="person" size={16} color="#fff" />
                            </View>
                        )}
                        <View style={[
                            styles.bubble,
                            item.sender === 'user' ? styles.userBubble : styles.agentBubble
                        ]}>
                            <Text style={[
                                styles.text,
                                item.sender === 'user' ? styles.userText : styles.agentText
                            ]}>{item.text}</Text>
                            <Text style={[
                                styles.time,
                                item.sender === 'user' ? styles.userTime : styles.agentTime
                            ]}>{item.time}</Text>
                        </View>
                    </View>
                )}
            />

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={100}>
                <View style={styles.inputArea}>
                    <TouchableOpacity style={styles.attachBtn}>
                        <Ionicons name="add" size={24} color={Colors.light.primary} />
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        placeholder="Type a message..."
                        value={input}
                        onChangeText={setInput}
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity
                        style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
                        onPress={sendMessage}
                        disabled={!input.trim()}
                    >
                        <Ionicons name="send" size={20} color="#fff" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F2F2F7' },
    list: { padding: 16, paddingBottom: 20 },
    msgRow: { flexDirection: 'row', marginBottom: 16, maxWidth: '85%' },
    msgRowUser: { alignSelf: 'flex-end', justifyContent: 'flex-end' },
    msgRowAgent: { alignSelf: 'flex-start' },

    avatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: Colors.light.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        alignSelf: 'flex-end',
    },

    bubble: {
        padding: 12,
        borderRadius: 20,
        minWidth: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    userBubble: {
        backgroundColor: Colors.light.primary,
        borderBottomRightRadius: 4,
    },
    agentBubble: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: 4,
    },

    text: { fontSize: 16, lineHeight: 22 },
    userText: { color: '#fff' },
    agentText: { color: '#333' },

    time: { fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },
    userTime: { color: 'rgba(255,255,255,0.7)' },
    agentTime: { color: '#999' },

    inputArea: {
        flexDirection: 'row',
        padding: 12,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    attachBtn: { padding: 8, marginRight: 4 },
    input: {
        flex: 1,
        backgroundColor: '#F2F2F7',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        fontSize: 16,
        marginRight: 8,
        maxHeight: 100,
    },
    sendBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.light.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendBtnDisabled: { backgroundColor: '#ccc' },
});
