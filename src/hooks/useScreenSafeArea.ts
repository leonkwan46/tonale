import { BOTTOM_NAVBAR_HEIGHT } from '@/constants/Navbar'
import { Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export function useScreenSafeArea() {
  const insets = useSafeAreaInsets()
  
  // Calculate bottom padding considering the navbar
  const bottomPadding = Platform.OS === 'ios' 
    ? insets.bottom + BOTTOM_NAVBAR_HEIGHT 
    : insets.bottom
  
  return {
    ...insets,
    bottomPadding,
    // Additional convenience values
    topPadding: insets.top,
    leftPadding: insets.left,
    rightPadding: insets.right,
    // For screens that need different bottom handling
    bottomWithoutNav: insets.bottom,
    navBarHeight: BOTTOM_NAVBAR_HEIGHT
  }
}
