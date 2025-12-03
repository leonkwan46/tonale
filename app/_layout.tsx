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
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    'Bravura': require('../assets/fonts/Bravura.otf'),
    'BravuraText': require('../assets/fonts/BravuraText.otf'),
    // SourGummy Regular width variants
    'SourGummy-Thin': require('../assets/fonts/sourGummy/SourGummy-Thin.ttf'),
    'SourGummy-ThinItalic': require('../assets/fonts/sourGummy/SourGummy-ThinItalic.ttf'),
    'SourGummy-ExtraLight': require('../assets/fonts/sourGummy/SourGummy-ExtraLight.ttf'),
    'SourGummy-ExtraLightItalic': require('../assets/fonts/sourGummy/SourGummy-ExtraLightItalic.ttf'),
    'SourGummy-Light': require('../assets/fonts/sourGummy/SourGummy-Light.ttf'),
    'SourGummy-LightItalic': require('../assets/fonts/sourGummy/SourGummy-LightItalic.ttf'),
    'SourGummy-Regular': require('../assets/fonts/sourGummy/SourGummy-Regular.ttf'),
    'SourGummy-Italic': require('../assets/fonts/sourGummy/SourGummy-Italic.ttf'),
    'SourGummy-Medium': require('../assets/fonts/sourGummy/SourGummy-Medium.ttf'),
    'SourGummy-MediumItalic': require('../assets/fonts/sourGummy/SourGummy-MediumItalic.ttf'),
    'SourGummy-SemiBold': require('../assets/fonts/sourGummy/SourGummy-SemiBold.ttf'),
    'SourGummy-SemiBoldItalic': require('../assets/fonts/sourGummy/SourGummy-SemiBoldItalic.ttf'),
    'SourGummy-Bold': require('../assets/fonts/sourGummy/SourGummy-Bold.ttf'),
    'SourGummy-BoldItalic': require('../assets/fonts/sourGummy/SourGummy-BoldItalic.ttf'),
    'SourGummy-ExtraBold': require('../assets/fonts/sourGummy/SourGummy-ExtraBold.ttf'),
    'SourGummy-ExtraBoldItalic': require('../assets/fonts/sourGummy/SourGummy-ExtraBoldItalic.ttf'),
    'SourGummy-Black': require('../assets/fonts/sourGummy/SourGummy-Black.ttf'),
    'SourGummy-BlackItalic': require('../assets/fonts/sourGummy/SourGummy-BlackItalic.ttf')
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
