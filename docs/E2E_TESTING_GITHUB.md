# E2E Testing with GitHub Actions

This guide explains how to ensure your Maestro e2e tests run successfully in GitHub Actions.

## 🚨 **Key Challenges for CI/CD**

### 1. **Device/Simulator Requirements**
- Maestro needs a physical device or simulator to run tests
- GitHub Actions runners don't have iOS simulators by default
- Android emulators can be set up but are resource-intensive

### 2. **App Installation**
- The app needs to be installed on the device/simulator
- Expo development builds require proper setup

## 🔧 **Solutions for GitHub Actions**

### **Option 1: Use Expo Development Build (Recommended)**

```yaml
# .github/workflows/e2e-tests.yml
name: E2E Tests

on:
  push:
    branches: [ main, staging ]
  pull_request:
    branches: [ main, staging ]

jobs:
  e2e-tests:
    runs-on: macos-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '22'
        cache: 'npm'
        
    - name: Install dependencies
      env:
        NODE_AUTH_TOKEN: ${{ secrets.MUSIC_NOTATION_SECRET_KEY }}
      run: |
        echo "//npm.pkg.github.com/:_authToken=${{ secrets.MUSIC_NOTATION_SECRET_KEY }}" > ~/.npmrc
        echo "@leonkwan46:registry=https://npm.pkg.github.com" >> ~/.npmrc
        npm ci
        
    - name: Install Expo CLI
      run: npm install -g @expo/cli
      
    - name: Install Maestro
      run: |
        curl -Ls "https://get.maestro.mobile.dev" | bash
        echo "$HOME/.maestro/bin" >> $GITHUB_PATH
        
    - name: Setup Expo
      run: |
        npx expo install --fix
        
    - name: Start Expo development server
      run: |
        npx expo start --clear --no-dev --minify &
        sleep 60 # Wait for server to start
        
    - name: Run E2E tests
      run: |
        maestro test tests/e2e/app-launch.yaml
        
    - name: Upload test results
      if: always()
      uses: actions/upload-artifact@v4
      with:
        name: e2e-test-results
        path: maestro-results/
```

### **Option 2: Use Android Emulator (More Reliable)**

```yaml
# Alternative approach with Android emulator
- name: Setup Android SDK
  uses: android-actions/setup-android@v3

- name: Create Android emulator
  run: |
    echo "y" | $ANDROID_HOME/cmdline-tools/latest/bin/avdmanager create avd -n test_avd -k "system-images;android-33;google_apis;x86_64" --force

- name: Start Android emulator
  run: |
    $ANDROID_HOME/emulator/emulator -avd test_avd -no-audio -no-window &
    adb wait-for-device

- name: Install app on emulator
  run: |
    # Build and install your app
    npx expo run:android
```

## 🎯 **Recommended Approach**

### **For Development:**
- Run tests locally with `npm run test:e2e`
- Use physical device or local simulator

### **For CI/CD:**
- Use Expo development server approach (Option 1)
- Tests run against the web version of your app
- Faster and more reliable than device/simulator setup

## 🔍 **Testing Your Setup**

### **1. Test Locally First**
```bash
# Make sure your app is running
npm start

# In another terminal, run tests
npm run test:e2e
```

### **2. Test GitHub Actions**
```bash
# Push to a branch to trigger the workflow
git add .
git commit -m "test: add e2e testing"
git push origin your-branch
```

### **3. Check Workflow Results**
- Go to your GitHub repository
- Click "Actions" tab
- Look for "E2E Tests" workflow
- Check the logs for any failures

## 🛠 **Troubleshooting**

### **Common Issues:**

1. **"App not found"**
   - Make sure the app is running
   - Check the app ID in `maestro.yaml`

2. **"Element not visible"**
   - Update test selectors to match your actual UI
   - Add wait times for loading states

3. **"Timeout errors"**
   - Increase timeout in test files
   - Add more wait steps

### **Debug Steps:**

1. **Check Maestro logs:**
   ```bash
   maestro test tests/e2e/app-launch.yaml --debug
   ```

2. **View screenshots:**
   - Check `/Users/leonkwan/.maestro/tests/` for debug artifacts

3. **Test individual steps:**
   ```bash
   maestro test tests/e2e/app-launch.yaml --step 1
   ```

## 📋 **Best Practices**

1. **Keep tests simple** - Focus on critical user flows
2. **Use stable selectors** - Avoid fragile element selectors
3. **Add wait times** - Account for loading states
4. **Test locally first** - Always verify before pushing
5. **Monitor CI results** - Check workflow status regularly

## 🚀 **Next Steps**

1. **Start with the basic workflow** (Option 1)
2. **Test locally** to ensure everything works
3. **Push to GitHub** to test CI/CD
4. **Monitor results** and adjust as needed
5. **Add more tests** as your app grows

Remember: E2E testing in CI/CD is challenging but valuable. Start simple and build up complexity over time!
