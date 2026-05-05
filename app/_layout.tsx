import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import '@/config/theme/devThemeContrast'
import { initSentry, wrapWithSentry } from '@/config/sentry'
import { darkSemanticColors, lightSemanticColors } from '@/config/theme/semantic'
import { AppThemeProvider } from '@/globalComponents/AppThemeProvider'
import { ErrorBoundary } from '@/globalComponents/ErrorBoundary'
import { ModalRoot } from '@/globalComponents/ModalRoot'
import { NetworkToast } from '@/globalComponents/NetworkToast'
import { ThemeModeProvider, useThemeMode } from '@/hooks/useThemeModeContext'
import { useUserBootstrap } from '@/hooks/useUserBootstrap'
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
  const colorScheme = useColorScheme()
  const rootBgColor = colorScheme === 'dark' ? darkSemanticColors.background : lightSemanticColors.background

  useUserBootstrap()

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: rootBgColor }}>
      <SafeAreaProvider>
        <ThemeModeProvider>
          <AppThemeProvider>
            <ErrorBoundary>
              <DevErrorBoundaryTrigger />
              <ModalRoot>
                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="(auth)" />
                  <Stack.Screen name="(app)" />
                  <Stack.Screen name="onboarding" />
                  <Stack.Screen name="+not-found" />
                </Stack>
                <NetworkToast />
                <ThemedStatusBar />
                {showSplash && (
                  <SplashScreen onComplete={() => setShowSplash(false)} />
                )}
              </ModalRoot>
            </ErrorBoundary>
          </AppThemeProvider>
        </ThemeModeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export default wrapWithSentry(RootLayout)
