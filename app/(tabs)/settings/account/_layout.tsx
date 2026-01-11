import { Stack } from 'expo-router'

export default function AccountLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="edit-name" />
      <Stack.Screen name="change-password" />
      <Stack.Screen name="change-email" />
      <Stack.Screen name="change-instrument" />
      <Stack.Screen name="change-gender" />
    </Stack>
  )
}

