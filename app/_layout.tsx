import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { SplashScreen } from '@/screens/SplashScreen'
import { ErrorBoundary, ProgressProvider, UnifiedThemeProvider, UserProvider } from '@/sharedComponents'

export default function RootLayout() {  
  const [showSplash, setShowSplash] = useState(true)

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <UserProvider>
          <ProgressProvider>
            {showSplash ? (
            <SplashScreen onComplete={() => setShowSplash(false)} />
          ) : (
            <UnifiedThemeProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="onboarding" />
                <Stack.Screen name="lesson" />
                <Stack.Screen name="+not-found" />
              </Stack>
              <StatusBar style="auto" />
            </UnifiedThemeProvider>
          )}
          </ProgressProvider>
        </UserProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}
