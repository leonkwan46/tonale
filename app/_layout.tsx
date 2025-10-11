import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { SplashScreen } from '@/screens/SplashScreen'
import { ErrorBoundary, UnifiedThemeProvider, UserProvider } from '@/sharedComponents'

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true)
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <UserProvider>
          {!loaded || showSplash ? (
            <SplashScreen onComplete={() => setShowSplash(false)} />
          ) : (
            <UnifiedThemeProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="lesson" />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </UnifiedThemeProvider>
          )}
        </UserProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}
