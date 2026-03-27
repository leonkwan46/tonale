import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import '@/config/theme/devThemeContrast'
import { AppThemeProvider } from '@/globalComponents/AppThemeProvider'
import { ErrorBoundary } from '@/globalComponents/ErrorBoundary'
import { NetworkToast } from '@/globalComponents/NetworkToast'
import { NetworkNotificationProvider } from '@/hooks/useNetworkNotificationContext'
import { ProgressProvider } from '@/hooks/useProgressContext'
import { ThemeModeProvider } from '@/hooks/useThemeModeContext'
import { UserProvider } from '@/hooks/useUserContext'
import { SplashScreen } from '@/screens/SplashScreen'

if (!__DEV__) {
  console.log = () => {}
  console.warn = () => {}
  console.error = () => {}
  console.info = () => {}
  console.debug = () => {}
}

const DevErrorBoundaryTrigger = () => {
  if (__DEV__ && process.env.EXPO_PUBLIC_FORCE_ERROR_BOUNDARY === '1') {
    throw new Error('Test ErrorBoundary')
  }
  return null
}

export default function RootLayout() {  
  const [showSplash, setShowSplash] = useState(true)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeModeProvider>
          <AppThemeProvider>
            <ErrorBoundary>
              <DevErrorBoundaryTrigger />
              <NetworkNotificationProvider>
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
                        <NetworkToast />
                        <StatusBar style="auto" />
                      </>
                      )}
                    </BottomSheetModalProvider>
                  </ProgressProvider>
                </UserProvider>
              </NetworkNotificationProvider>
            </ErrorBoundary>
          </AppThemeProvider>
        </ThemeModeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
