import { Platform } from 'react-native';

/**
 * API Configuration
 * 
 * For Android Emulator: Use 10.0.2.2 to connect to host's localhost
 * For iOS Simulator: Use localhost
 * For Physical Devices: Use your machine's local IP (e.g. 192.168.1.5)
 */

const LOCAL_IP = '10.0.2.2'; // Change this to your local machine IP if using physical device
const PORT = '5000';

const DEV_URL = Platform.select({
    android: `http://${LOCAL_IP}:${PORT}`,
    ios: `http://localhost:${PORT}`,
    default: `http://localhost:${PORT}`,
});

const PROD_URL = 'https://tirumla-backend.vercel.app';

// Set this to true to use the production/deployed backend
const USE_PROD = true;

const BASE_URL = USE_PROD ? PROD_URL : DEV_URL;
// Ensure no double slashes if the user provided a URL with a trailing slash
export const API_URL = BASE_URL?.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
export const API_BASE_URL = `${API_URL}/api`;

console.log('[API] Initialized with:', API_URL);
