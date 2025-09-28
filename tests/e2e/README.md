# E2E Tests for Tonale

This directory contains end-to-end tests for the Tonale music theory learning app using Maestro.

## Test Files

- `app-launch.yaml` - Tests basic app launch and navigation
- `helpers.yaml` - Reusable test utilities

## Running Tests

### Prerequisites

1. Install Maestro:
   ```bash
   curl -Ls "https://get.maestro.mobile.dev" | bash
   export PATH="$PATH":"$HOME/.maestro/bin"
   ```

2. Start your Expo development server:
   ```bash
   npm start
   ```

3. Run the app on a device/simulator:
   ```bash
   # For iOS
   npm run ios
   
   # For Android
   npm run android
   ```

### Running Tests

```bash
# Run the app launch test
npm run test:e2e

# Run all tests in the directory
npm run test:e2e:all

# Run a single test file
maestro test tests/e2e/app-launch.yaml
```

## Test Configuration

The tests are configured to work with the Expo development build. Make sure your app is running on the device/simulator before running the tests.

## Writing New Tests

1. Create a new `.yaml` file in the `tests/e2e/` directory
2. Follow the Maestro syntax for mobile app testing
3. Use descriptive test names and comments
4. Test one specific flow per file

## Troubleshooting

- Make sure the app is running before running tests
- Check that the app ID matches your Expo app configuration
- Verify that UI elements have proper accessibility labels for testing
