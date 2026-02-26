# LifeLink App - Build Instructions

## Prerequisites
- Node.js installed
- Expo CLI installed globally: `npm install -g expo-cli`
- EAS CLI installed globally: `npm install -g eas-cli`
- Expo account (free at https://expo.dev)

## Option 1: Build APK using EAS Build (Recommended)

### Step 1: Install dependencies
```bash
npm install
```

### Step 2: Login to Expo
```bash
eas login
```

### Step 3: Configure the project
```bash
eas build:configure
```

### Step 4: Build APK for Android
```bash
eas build -p android --profile preview
```

This will:
- Build your app in the cloud
- Generate an APK file
- Provide a download link when complete (usually takes 10-15 minutes)

### Step 5: Download and Share
- Once the build completes, you'll get a download link
- Download the APK file
- Share it with your client via email, Google Drive, or any file sharing service

## Option 2: Local Build (Requires Android Studio)

### Step 1: Install dependencies
```bash
npm install
```

### Step 2: Start Expo
```bash
npx expo start
```

### Step 3: Build locally
```bash
npx expo run:android
```

Note: This requires Android Studio and Android SDK to be installed.

## Option 3: Quick Testing with Expo Go (No Build Required)

### For quick prototype testing:
1. Install Expo Go app on your Android device from Play Store
2. Run: `npm start`
3. Scan the QR code with Expo Go app
4. The app will load directly on your device

Note: This doesn't create an APK but allows quick testing.

## Troubleshooting

### If you get "eas-cli not found":
```bash
npm install -g eas-cli
```

### If build fails due to missing project ID:
1. Run: `eas build:configure`
2. Follow the prompts to link your project

### To check build status:
```bash
eas build:list
```

## Build Profiles

- **preview**: Creates APK for testing (recommended for client demos)
- **production**: Creates optimized build for Play Store

## Notes
- The APK will be around 50-80MB
- First build may take longer (15-20 minutes)
- Subsequent builds are faster (5-10 minutes)
- APK can be installed on any Android device without Play Store
