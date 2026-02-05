import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function ConsultantChatScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();
    const { expertName, expertId } = params;

    // Default to a generic name if missing
    const name = expertName || 'Agri Expert';

    const [messages, setMessages] = useState([
        { id: '1', text: `Namaste! I am ${name}. How can I help you with your crop today?`, sender: 'agent', time: 'Just now' },
    ]);
    const [input, setInput] = useState('');
    const listRef = useRef<FlatList>(null);

    const sendMessage = () => {
        if (!input.trim()) return;

        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const userMsg = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            time: timestamp
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simulate Typing & Reply
        setTimeout(() => {
            const replyMsg = {
                id: (Date.now() + 1).toString(),
                text: 'I understand your concern. Can you please upload a photo of the affected leaf?',
                sender: 'agent',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, replyMsg]);
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: name as string,
                    headerTitleStyle: { fontSize: 18 },
                    headerRight: () => (
                        <TouchableOpacity onPress={() => router.push({ pathname: '/experts/call', params: { expertName: name } })}>
                            <Ionicons name="call" size={22} color={Colors.light.primary} />
                        </TouchableOpacity>
                    )
                }}
            />

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
                            <Image
                                source={require('../../assets/images/expert_1.png')}
                                style={styles.avatar}
                            />
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

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={100}
                style={styles.keyboardView}
            >
                <View style={styles.inputArea}>
                    <TouchableOpacity style={styles.attachBtn}>
                        <Ionicons name="camera-outline" size={24} color="#666" />
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
    container: { flex: 1, backgroundColor: '#EFE7DE' }, // WhatsApp-like subtle bg
    list: { padding: 16, paddingBottom: 20 },
    msgRow: { flexDirection: 'row', marginBottom: 16, maxWidth: '85%' },
    msgRowUser: { alignSelf: 'flex-end', justifyContent: 'flex-end' },
    msgRowAgent: { alignSelf: 'flex-start' },

    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 8,
        alignSelf: 'flex-end',
        borderWidth: 1,
        borderColor: '#fff',
    },

    bubble: {
        padding: 12,
        borderRadius: 16,
        minWidth: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 1,
        elevation: 1,
    },
    userBubble: {
        backgroundColor: '#128C7E', // WhatsApp Green-ish
        borderTopRightRadius: 0,
    },
    agentBubble: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 0,
    },

    text: { fontSize: 16, lineHeight: 22 },
    userText: { color: '#fff' },
    agentText: { color: '#333' },

    time: { fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },
    userTime: { color: 'rgba(255,255,255,0.7)' },
    agentTime: { color: '#999' },

    keyboardView: { backgroundColor: '#fff' },
    inputArea: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    attachBtn: { padding: 8, marginRight: 4 },
    input: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        borderRadius: 24,
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
        backgroundColor: '#128C7E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    sendBtnDisabled: { backgroundColor: '#ccc' },
});
