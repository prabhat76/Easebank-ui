# Easebank Multi-Platform Deployment Guide

## 🌐 Web Deployment
```bash
npm run build:prod
# Deploy dist/easebank/browser to any web server
```

## 📱 Android Deployment
```bash
# Add Android platform
npx cap add android

# Build and sync
npm run cap:android

# Or build and run with live reload
npm run cap:serve
```

## 🍎 iOS Deployment
```bash
# Add iOS platform (macOS only)
npx cap add ios

# Build and open in Xcode
npm run cap:ios
```

## 🔧 Development Commands
- `npm start` - Web development server
- `npm run cap:build` - Build and sync for mobile
- `npm run cap:android` - Open Android Studio
- `npm run cap:ios` - Open Xcode (macOS only)

## 📋 Prerequisites
- **Android**: Android Studio, Android SDK
- **iOS**: Xcode (macOS only), iOS SDK
- **Web**: Any web server (Netlify, Vercel, etc.)

## 🚀 Quick Deploy
1. **Web**: `npm run build:prod` → Upload `dist/` folder
2. **Android**: `npm run cap:android` → Build APK in Android Studio
3. **iOS**: `npm run cap:ios` → Build IPA in Xcode