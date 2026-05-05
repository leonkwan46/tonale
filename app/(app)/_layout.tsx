import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Stack } from 'expo-router'

import { useProgressBootstrap } from '@/hooks/useProgressBootstrap'

const AppLayout = () => {
  useProgressBootstrap()
  return (
    <BottomSheetModalProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="lesson" options={{ gestureEnabled: false }} />
        <Stack.Screen name="revision" />
      </Stack>
    </BottomSheetModalProvider>
  )
}

export default AppLayout
