import { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, ZoomIn, runOnJS } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function LoadingScreen() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace('/language-selection');
        }, 3500); // Slightly longer to appreciate the animation

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <Animated.Image
                entering={ZoomIn.duration(1000).springify()}
                source={require('../assets/images/tirumala_logo_final.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <Animated.Text
                entering={FadeIn.delay(1000).duration(1000)}
                style={styles.tagline}
            >
                Empowering Farmers
            </Animated.Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // White background as requested
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: width * 0.8, // 80% of screen width
        height: width * 0.8,
        maxWidth: 400,
        maxHeight: 400,
    },
    tagline: {
        marginTop: 20,
        fontSize: 16,
        color: '#2E7D32', // Matches the green in the logo
        fontWeight: '600',
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        opacity: 0.8,
    },
});
