import { Stack } from 'expo-router';
import { Colors } from '@/constants/theme';

export default function WalletLayout() {
    return (
        <Stack screenOptions={{
            headerStyle: { backgroundColor: '#fff' },
            headerTintColor: '#333',
            headerTitleStyle: { fontWeight: 'bold' },
        }}>
            <Stack.Screen name="index" options={{ title: 'My Wallet' }} />
            <Stack.Screen name="add-money" options={{ title: 'Add Money' }} />
        </Stack>
    );
}
