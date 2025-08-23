import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import 'react-native-reanimated'

import { ErrorBoundary } from '@/components/ErrorBoundary'
import { SplashScreen } from '@/screens/SplashScreen'

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [showSplash, setShowSplash] = useState(true)
  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  })

  // Show splash while fonts are loading
  if (!loaded || showSplash) {
    return (
      <SafeAreaProvider>
        <ErrorBoundary>
          <SplashScreen 
            onComplete={() => setShowSplash(false)} 
          />
        </ErrorBoundary>
      </SafeAreaProvider>
    )
  }

  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </ErrorBoundary>
    </SafeAreaProvider>
  )
}
