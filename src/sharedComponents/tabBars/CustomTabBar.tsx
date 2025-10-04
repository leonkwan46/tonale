import styled from '@emotion/native'
import { Ionicons } from '@expo/vector-icons'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import * as React from 'react'
import { Platform, TouchableOpacity, useColorScheme } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { scale, verticalScale } from 'react-native-size-matters'

import { Colors } from '@/constants/Colors'
import { useDevice } from '@/hooks'

type IoniconsName = keyof typeof Ionicons.glyphMap

const TAB_CONFIG = {
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
}

const TabBarContainer = styled.View<{ 
  bottomInset: number
  colorScheme: string
  isTablet: boolean
  config: typeof TAB_CONFIG.PHONE | typeof TAB_CONFIG.TABLET
}>(({ theme, bottomInset, colorScheme, isTablet, config }) => ({
  flexDirection: 'row',
  backgroundColor: Colors[colorScheme as keyof typeof Colors].surface,
  borderTopWidth: 1,
  borderTopColor: Colors[colorScheme as keyof typeof Colors].border,
  paddingBottom: bottomInset,
  paddingHorizontal: isTablet ? config.paddingHorizontal : scale(config.paddingHorizontal),
  height: Platform.select({
    ios: isTablet ? config.height.ios : verticalScale(config.height.ios),
    android: isTablet ? config.height.android : verticalScale(config.height.android)
  }),
  elevation: 8,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: -2
  },
  shadowOpacity: 0.1,
  shadowRadius: 8
}))

const TabButton = styled(TouchableOpacity)<{
  isTablet: boolean
  config: typeof TAB_CONFIG.PHONE | typeof TAB_CONFIG.TABLET
}>(({ isTablet, config }) => ({
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: isTablet ? config.paddingVertical : verticalScale(config.paddingVertical)
}))

const TabLabel = styled.Text<{ 
  focused: boolean
  colorScheme: string
  isTablet: boolean
  config: typeof TAB_CONFIG.PHONE | typeof TAB_CONFIG.TABLET
}>(({ focused, colorScheme, isTablet, config }) => ({
  fontSize: isTablet ? config.fontSize : scale(config.fontSize),
  fontWeight: '500',
  color: focused 
    ? Colors[colorScheme as keyof typeof Colors].tint 
    : Colors[colorScheme as keyof typeof Colors].tabIconDefault,
  marginTop: 4
}))

// Fallback functions for when options don't provide values
const getTabIcon = (routeName: string) => {
  switch (routeName) {
    case 'index':
      return 'home'
    case 'theory':
      return 'book'
    case 'aural':
      return 'musical-notes'
    case 'settings':
      return 'settings'
    default:
      return 'home'
  }
}

const getTabLabel = (routeName: string) => {
  switch (routeName) {
    case 'index':
      return 'Home'
    case 'theory':
      return 'Theory'
    case 'aural':
      return 'Aural'
    case 'settings':
      return 'Settings'
    default:
      return 'Home'
  }
}

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets()
  const colorScheme = useColorScheme() ?? 'light'
  const { isTablet } = useDevice()
  const config = isTablet ? TAB_CONFIG.TABLET : TAB_CONFIG.PHONE

  return (
    <TabBarContainer 
      bottomInset={insets.bottom} 
      colorScheme={colorScheme}
      isTablet={isTablet}
      config={config}
    >
      {state.routes.map((route, index: number) => {
        const { options } = descriptors[route.key]
        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        // Use options from descriptors with fallbacks
        const label = options.title || getTabLabel(route.name)
        const iconColor = isFocused 
          ? Colors[colorScheme as keyof typeof Colors].tint 
          : Colors[colorScheme as keyof typeof Colors].tabIconDefault

        // Get icon from options or fallback
        const iconName: IoniconsName = getTabIcon(route.name) as IoniconsName

        return (
          <TabButton
            key={route.key}
            testID={`tab-${route.name}`}
            onPress={onPress}
            activeOpacity={0.7}
            isTablet={isTablet}
            config={config}
          >
            <Ionicons
              name={iconName}
              size={isTablet ? config.iconSize : scale(config.iconSize)}
              color={iconColor}
            />
            <TabLabel 
              focused={isFocused} 
              colorScheme={colorScheme}
              isTablet={isTablet}
              config={config}
            >
              {label}
            </TabLabel>
          </TabButton>
        )
      })}
    </TabBarContainer>
  )
}
