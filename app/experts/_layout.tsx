import { Stack } from 'expo-router';

export default function ConsultLayout() {
    return (
        <Stack>
            <Stack.Screen name="chat" options={{ title: 'Chat' }} />
            <Stack.Screen name="call" options={{ headerShown: false }} />
        </Stack>
    );
}
