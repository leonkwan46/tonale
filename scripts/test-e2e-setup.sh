#!/bin/bash

# E2E Test Setup Verification Script
# This script helps verify that your e2e testing setup is working correctly

echo "🔍 Verifying E2E Test Setup..."

# Check if Maestro is installed
if ! command -v maestro &> /dev/null; then
    echo "❌ Maestro is not installed. Installing now..."
    curl -Ls "https://get.maestro.mobile.dev" | bash
    export PATH="$PATH:$HOME/.maestro/bin"
else
    echo "✅ Maestro is installed"
fi

# Check if Expo CLI is installed
if ! command -v expo &> /dev/null; then
    echo "❌ Expo CLI is not installed. Installing now..."
    npm install -g @expo/cli
else
    echo "✅ Expo CLI is installed"
fi

# Check if test files exist
if [ ! -f "tests/e2e/app-launch.yaml" ]; then
    echo "❌ Test file not found: tests/e2e/app-launch.yaml"
    exit 1
else
    echo "✅ Test file exists"
fi

# Check if package.json has test scripts
if grep -q "test:e2e" package.json; then
    echo "✅ Test scripts found in package.json"
else
    echo "❌ Test scripts not found in package.json"
    exit 1
fi

# Check if app is running
echo "🔍 Checking if app is running..."
if lsof -i :8081 &> /dev/null; then
    echo "✅ Expo development server is running on port 8081"
else
    echo "⚠️  Expo development server is not running"
    echo "   Please start your app with: npm start"
    echo "   Then run this script again"
    exit 1
fi

# Run the test
echo "🧪 Running e2e test..."
npm run test:e2e

if [ $? -eq 0 ]; then
    echo "✅ E2E test passed!"
    echo "🎉 Your e2e testing setup is working correctly!"
else
    echo "❌ E2E test failed"
    echo "   Check the test output above for details"
    exit 1
fi
