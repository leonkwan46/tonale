import styled from '@emotion/native'
import { useTheme } from '@emotion/react'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Platform } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'

import { getSourGummyFontFamily } from '@/utils/fontHelper'
import { PressableFeedback } from '@/utils/PressableFeedback'
import { createForwardProps } from '@/utils/styledProps'

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

export const useTabBarSetup = () => {
  const { device } = useTheme()
  const config = device.isTablet ? TAB_CONFIG.TABLET : TAB_CONFIG.PHONE
  const iconSize = device.isTablet ? config.iconSize : scale(config.iconSize)
  return { config, iconSize }
}

export const getTabBarHeight = (theme: { device: { isTablet: boolean }, spacing: { sm: number } }) => {
  const config = theme.device.isTablet ? TAB_CONFIG.TABLET : TAB_CONFIG.PHONE
  return Platform.select({
    ios: theme.device.isTablet ? config.height.ios : verticalScale(config.height.ios + scale(theme.spacing.sm)),
    android: theme.device.isTablet ? config.height.android : verticalScale(config.height.android + scale(theme.spacing.sm))
  }) || 0
}

export const useTabBarHeight = () => {
  const theme = useTheme()
  return getTabBarHeight(theme)
}

export const TabBarContainer = styled(BlurView)<{
  bottomInset: number
  config: typeof TAB_CONFIG.PHONE | typeof TAB_CONFIG.TABLET
}>(({ theme, bottomInset, config }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  flexDirection: 'row',
  overflow: 'hidden',
  paddingBottom: bottomInset,
  paddingHorizontal: theme.device.isTablet ? config.paddingHorizontal : scale(config.paddingHorizontal),
  height: Platform.select({
    ios: theme.device.isTablet ? config.height.ios : verticalScale(config.height.ios + scale(theme.spacing.sm)),
    android: theme.device.isTablet ? config.height.android : verticalScale(config.height.android + scale(theme.spacing.sm))
  })
}))

export const TabButton = styled(PressableFeedback, {
  shouldForwardProp: createForwardProps(['config'])
})<{
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
  color: focused ? theme.components.tabBar.active : theme.components.tabBar.inactive,
  marginTop: 4,
  fontFamily: getSourGummyFontFamily()
}))

export const TabIcon = styled(Ionicons)<{
  focused: boolean
  config: typeof TAB_CONFIG.PHONE | typeof TAB_CONFIG.TABLET
}>(({ focused, theme, config }) => ({
  color: focused ? theme.components.tabBar.active : theme.components.tabBar.inactive
}))
