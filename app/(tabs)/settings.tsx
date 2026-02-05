import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Colors } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function SettingsScreen() {
    const router = useRouter();
    const [pushEnabled, setPushEnabled] = React.useState(true);

    const renderItem = (icon: any, iconColor: string, title: string, subtitle?: string, onPress?: () => void, rightElement?: React.ReactNode) => (
        <TouchableOpacity
            style={styles.item}
            onPress={onPress}
            disabled={!onPress}
            activeOpacity={0.7}
        >
            <View style={[styles.iconBox, { backgroundColor: iconColor + '20' }]}>
                <Ionicons name={icon} size={20} color={iconColor} />
            </View>
            <View style={styles.itemContent}>
                <Text style={styles.itemTitle}>{title}</Text>
                {subtitle && <Text style={styles.itemSub}>{subtitle}</Text>}
            </View>
            {rightElement || <Ionicons name="chevron-forward" size={18} color="#C7C7CC" />}
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Stack.Screen options={{ title: 'Settings', headerShadowVisible: false, headerStyle: { backgroundColor: '#F2F2F7' } }} />

            <View style={styles.header}>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>

            <View style={styles.profileSection}>
                <View style={styles.profileHeader}>
                    <Image
                        source={{ uri: 'https://ui-avatars.com/api/?name=Rahul+Kumar&background=0D8ABC&color=fff&size=128' }}
                        style={styles.profileImg}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.profileName}>Rahul Kumar</Text>
                        <Text style={styles.profileHandle}>+91 98765 43210</Text>
                    </View>
                    <TouchableOpacity style={styles.editBtn} onPress={() => router.push('/auth/profile-setup')}>
                        <Ionicons name="pencil" size={16} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>PREFERENCES</Text>
            </View>
            <View style={styles.section}>
                {renderItem('earth', '#007AFF', 'Language', 'English', () => router.push('/language-selection'))}
                <View style={styles.separator} />
                {renderItem('notifications', '#FF3B30', 'Push Notifications', undefined, undefined,
                    <Switch
                        value={pushEnabled}
                        onValueChange={setPushEnabled}
                        trackColor={{ false: '#767577', true: Colors.light.primary }}
                        thumbColor="#fff"
                        ios_backgroundColor="#3e3e3e"
                    />
                )}
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>SUPPORT</Text>
            </View>
            <View style={styles.section}>
                {renderItem('help-buoy', '#34C759', 'Help Center', 'Get answers to your questions', () => router.push('/support/create-ticket'))}
                <View style={styles.separator} />
                {renderItem('chatbubbles', '#5856D6', 'Live Chat', 'Talk to an expert', () => router.push('/support/live-chat'))}
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>ABOUT</Text>
            </View>
            <View style={styles.section}>
                {renderItem('information-circle', '#FF9500', 'About Tirumala', 'Version 1.0.0', () => router.push('/about'))}
                <View style={styles.separator} />
                {renderItem('document-text', '#8E8E93', 'Terms & Privacy', undefined, () => { })}
            </View>

            <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/')} activeOpacity={0.8}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7', // iOS grouped table view bg color
        paddingHorizontal: 16,
    },
    header: {
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#000',
    },
    profileSection: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImg: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    profileInfo: {
        flex: 1,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    profileHandle: {
        fontSize: 14,
        color: '#8E8E93',
    },
    editBtn: {
        backgroundColor: Colors.light.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionHeader: {
        marginBottom: 8,
        marginLeft: 8,
    },
    sectionTitle: {
        fontSize: 13,
        color: '#6D6D72',
        fontWeight: '600',
        letterSpacing: -0.08,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    iconBox: {
        width: 30,
        height: 30,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    itemContent: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        color: '#000',
        fontWeight: '500',
    },
    itemSub: {
        fontSize: 12,
        color: '#8E8E93',
        marginTop: 2,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#C6C6C8',
        marginLeft: 58,
    },
    logoutBtn: {
        marginTop: 8,
        marginHorizontal: 16,
        backgroundColor: '#fff',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FF3B30',
    },
    logoutText: {
        color: '#FF3B30',
        fontSize: 16,
        fontWeight: '600',
    },
});
