import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.easebank.app',
  appName: 'Easebank',
  webDir: 'dist/easebank/browser',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    StatusBar: {
      style: 'DARK'
    }
  }
};

export default config;
