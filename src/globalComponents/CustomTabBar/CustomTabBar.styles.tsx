import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import { Platform, TouchableOpacity } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'

export const TAB_CONFIG = {
  PHONE: {
    height: { ios: 75, android: 60 },
    iconSize: 20,
    fontSize: 10,
    paddingVertical: 6,
    paddingHorizontal: 12
  },
  TABLET: {
    height: { ios: 120, android: 100 },
    iconSize: 40,
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 16
  }
} as const

export const TabBarContainer = styled.View<{ 
  bottomInset: number
  config: typeof TAB_CONFIG.PHONE | typeof TAB_CONFIG.TABLET
}>(({ theme, bottomInset, config }) => ({
  flexDirection: 'row',
  backgroundColor: theme.colors.surface,
  borderTopWidth: 1,
  borderTopColor: theme.colors.border,
  paddingBottom: bottomInset,
  paddingHorizontal: theme.device.isTablet ? config.paddingHorizontal : scale(config.paddingHorizontal),
  height: Platform.select({
    ios: theme.device.isTablet ? config.height.ios : verticalScale(config.height.ios),
    android: theme.device.isTablet ? config.height.android : verticalScale(config.height.android)
  }),
  ...theme.shadows.lg
}))

export const TabButton = styled(TouchableOpacity)<{
  config: typeof TAB_CONFIG.PHONE | typeof TAB_CONFIG.TABLET
}>(({ theme, config }) => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: theme.device.isTablet ? config.paddingVertical : verticalScale(config.paddingVertical)
}))

export const TabLabel = styled.Text<{ 
  focused: boolean
  config: typeof TAB_CONFIG.PHONE | typeof TAB_CONFIG.TABLET
}>(({ focused, theme, config }) => ({
  fontSize: theme.device.isTablet ? config.fontSize : scale(config.fontSize),
  color: focused ? theme.colors.tint : theme.colors.tabIconDefault,
  marginTop: 4,
  fontFamily: getSourGummyFontFamily('500')
}))

export const TabIcon = styled(Ionicons)<{
  focused: boolean
  config: typeof TAB_CONFIG.PHONE | typeof TAB_CONFIG.TABLET
}>(({ focused, theme, config }) => ({
  color: focused ? theme.colors.tint : theme.colors.tabIconDefault
}))
