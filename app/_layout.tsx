import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppThemeProvider>
          <ErrorBoundary>
            <UserProvider>
              <ProgressProvider>
                <BottomSheetModalProvider>
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
                </BottomSheetModalProvider>
            </ProgressProvider>
          </UserProvider>
        </ErrorBoundary>
        </AppThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
