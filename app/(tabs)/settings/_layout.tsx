import { Stack } from 'expo-router'

const SettingsLayout = () => (
  <Stack
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen name="index" />
    <Stack.Screen name="account" />
    <Stack.Screen name="donation" />
    <Stack.Screen name="feedback" />
    <Stack.Screen name="privacy-policy" />
  </Stack>
)

export default SettingsLayout
