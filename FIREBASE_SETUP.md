# Firebase Configuration Setup

## ⚠️ Security Notice

The Firebase configuration files contain sensitive API keys and should **NEVER** be committed to version control.

## Setup Instructions

### 1. Download Your Firebase Configuration Files

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **tonale**
3. Go to **Project Settings** (gear icon) → **General**

#### For Android:
1. Scroll to **Your apps** section
2. Find your Android app
3. Click **google-services.json** button to download
4. Place the file at: `android/app/google-services.json`

#### For iOS:
1. Scroll to **Your apps** section
2. Find your iOS app
3. Click **GoogleService-Info.plist** button to download
4. Place the file at: `ios/tonale/GoogleService-Info.plist`

### 2. Verify Files are Ignored

The `.gitignore` file already includes these files:
```
google-services.json
GoogleService-Info.plist
```

**Never remove these entries!**

### 3. Template Files

Example template files are provided:
- `android/app/google-services.json.example`
- `ios/tonale/GoogleService-Info.plist.example`

These templates show the structure but contain placeholder values.

## If Keys Are Compromised

If your Firebase API keys are ever exposed:

1. **Regenerate API Keys Immediately**
   - Firebase Console → Project Settings → General
   - Scroll to your apps
   - Regenerate the keys

2. **Download New Configuration Files**
   - Download the new `google-services.json` and `GoogleService-Info.plist`
   - Replace your local files

3. **Update Firebase Restrictions** (Optional but recommended)
   - Firebase Console → Project Settings
   - Set up API key restrictions for added security

## Questions?

For more information, see the [Firebase documentation](https://firebase.google.com/docs).

