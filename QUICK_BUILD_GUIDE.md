# Quick Build Guide - LifeLink APK

## Fastest Way to Build APK (5 Steps)

### 1. Install EAS CLI (one-time setup)
```bash
npm install -g eas-cli
```

### 2. Login to Expo
```bash
eas login
```
(Create a free account at expo.dev if you don't have one)

### 3. Install dependencies
```bash
npm install
```

### 4. Build the APK
```bash
npm run build:apk
```

### 5. Wait and Download
- Build takes 10-15 minutes
- You'll get a download link in the terminal
- Download the APK and share with your client

## Alternative: Test Without Building

If you just want to show the prototype quickly:

1. Install "Expo Go" app on Android phone
2. Run: `npm start`
3. Scan QR code with Expo Go
4. App runs instantly on phone

## What You'll Get

- APK file (50-80MB)
- Can be installed on any Android device
- No Play Store needed
- Works offline after installation

## Sharing the APK

You can share via:
- Email (if under 25MB, compress if needed)
- Google Drive / Dropbox
- WeTransfer
- Direct USB transfer

## Need Help?

Check BUILD_INSTRUCTIONS.md for detailed steps and troubleshooting.
