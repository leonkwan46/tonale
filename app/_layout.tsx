import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import '@/config/theme/devThemeContrast'
import { initSentry, wrapWithSentry } from '@/config/sentry'
import { AppThemeProvider } from '@/globalComponents/AppThemeProvider'
import { ErrorBoundary } from '@/globalComponents/ErrorBoundary'
import { NetworkToast } from '@/globalComponents/NetworkToast'
import { NetworkNotificationProvider } from '@/hooks/useNetworkNotificationContext'
import { ProgressProvider } from '@/hooks/useProgressContext'
import { ThemeModeProvider, useThemeMode } from '@/hooks/useThemeModeContext'
import { UserProvider } from '@/hooks/useUserContext'
import { SplashScreen } from '@/screens/SplashScreen'

initSentry()

const ThemedStatusBar = () => {
  const { isDark } = useThemeMode()
  return <StatusBar style={isDark ? 'light' : 'dark'} />
}

const DevErrorBoundaryTrigger = () => {
  if (__DEV__ && process.env.EXPO_PUBLIC_FORCE_ERROR_BOUNDARY === '1') {
    throw new Error('Test ErrorBoundary')
  }
  return null
}

const RootLayout = () => {
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
                          <Stack.Screen name="revision" options={{ headerShown: false }} />
                          <Stack.Screen name="+not-found" />
                        </Stack>
                        <NetworkToast />
                        <ThemedStatusBar />
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

export default wrapWithSentry(RootLayout)
