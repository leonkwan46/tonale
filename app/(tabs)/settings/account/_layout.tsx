import { Stack } from 'expo-router'

const AccountLayout = () => (
  <Stack
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen name="index" />
    <Stack.Screen name="edit-name" />
    <Stack.Screen name="change-password" />
    <Stack.Screen name="change-email" />
    <Stack.Screen name="change-email-form" />
    <Stack.Screen name="change-instrument" />
    <Stack.Screen name="change-gender" />
  </Stack>
)

export default AccountLayout

