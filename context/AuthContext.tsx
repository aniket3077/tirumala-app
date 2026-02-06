import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@/constants/api';

const TOKEN_KEY = 'tirumala_auth_token';
const USER_KEY = 'tirumala_user_data';

interface UserProfile {
    id: string;
    email: string;
    role: string;
    profile?: any; // Generic profile field to match backend response
    farmerProfile?: {
        fullName: string;
        phone: string;
        village: string;
        location?: string;
        state: string;
        crops: string;
        landSize?: number;
        preferredLanguage?: string;
        avatar: string;
    };
    expertProfile?: {
        name: string;
        title: string;
        profileImage: string;
        phone?: string;
        location?: string;
        village?: string;
        state?: string;
        landSize?: string;
        preferredLanguage?: string;
        crops?: string;
    };
    wallet?: {
        balance: number;
    };
}

interface AuthContextType {
    user: UserProfile | null;
    token: string | null;
    loading: boolean;
    login: (token: string, userData: any) => void;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Initial load from storage
    useEffect(() => {
        const loadStoredAuth = async () => {
            try {
                const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
                const storedUser = await AsyncStorage.getItem(USER_KEY);

                if (storedToken && storedUser) {
                    setToken(storedToken);
                    setUser(JSON.parse(storedUser));

                    // Background refresh
                    try {
                        const response = await axios.get(`${API_URL}/api/auth/me`, {
                            headers: { 'x-auth-token': storedToken }
                        });
                        if (response.data) {
                            setUser(response.data);
                            await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.data));
                        }
                    } catch (err) {
                        if (axios.isAxiosError(err) && err.response?.status === 401) {
                            await logout();
                        }
                    }
                }
            } catch (error) {
                console.error('[Auth] Initial load error:', error);
            } finally {
                setLoading(false);
            }
        };

        loadStoredAuth();
    }, []);

    const login = async (newToken: string, userData: any) => {
        setToken(newToken);
        setUser(userData);
        await AsyncStorage.setItem(TOKEN_KEY, newToken);
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
    };

    const logout = async () => {
        setToken(null);
        setUser(null);
        await AsyncStorage.removeItem(TOKEN_KEY);
        await AsyncStorage.removeItem(USER_KEY);
    };

    const refreshUser = async () => {
        if (!token) return;
        try {
            const response = await axios.get(`${API_URL}/api/auth/me`, {
                headers: { 'x-auth-token': token }
            });
            setUser(response.data);
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(response.data));
        } catch (error) {
            console.error('Refresh user error:', error);
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                await logout();
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login: (t, u) => login(t, u), logout: () => logout(), refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
