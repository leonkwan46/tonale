import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Stack } from 'expo-router'

import { ProgressProvider } from '@/hooks/useProgressContext'

const AppLayout = () => (
  <ProgressProvider>
    <BottomSheetModalProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="lesson" options={{ gestureEnabled: false }} />
        <Stack.Screen name="revision" />
      </Stack>
    </BottomSheetModalProvider>
  </ProgressProvider>
)

export default AppLayout
