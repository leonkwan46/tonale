import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { AppThemeProvider } from '@/globalComponents/AppThemeProvider'
import { ErrorBoundary } from '@/globalComponents/ErrorBoundary'
import { ProgressProvider } from '@/hooks/useProgressContext'
import { UserProvider } from '@/hooks/useUserContext'
import { SplashScreen } from '@/screens/SplashScreen'

export default function RootLayout() {  
  const [showSplash, setShowSplash] = useState(true)

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <UserProvider>
          <ProgressProvider>
            <AppThemeProvider>
              {showSplash ? (
                <SplashScreen onComplete={() => setShowSplash(false)} />
              ) : (
                <>
                  <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(auth)" />
                    <Stack.Screen name="(tabs)" />
                    <Stack.Screen name="onboarding" />
                    <Stack.Screen name="lesson" />
                    <Stack.Screen name="+not-found" />
                  </Stack>
                  <StatusBar style="auto" />
                </>
              )}
            </AppThemeProvider>
          </ProgressProvider>
        </UserProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}
